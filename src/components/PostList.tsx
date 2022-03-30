import { Avatar, Box, Input, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CommentIcon from '@mui/icons-material/Comment'
import WAvatar from '../assets/WAvatar.jpeg'
import MAvatar from '../assets/MAvatar.jpeg'
import { useState, KeyboardEvent, SetStateAction, Dispatch } from 'react'
import useAxios from '../hooks/useAxios'
import { IPost } from '../types'
import { format, parseISO } from 'date-fns'
import { useSelector } from 'react-redux'
import { IInitialState } from '../types/index'
import { notifyError, notifySuccess } from '../hooks/useNotify'

const ariaLabel = { 'aria-label': 'description' }

interface IProps {
    posts: IPost[]
    setterFunction: Dispatch<SetStateAction<IPost[]>>
    setUserLikes: Dispatch<SetStateAction<boolean>>
    userLikes: boolean
}

export default function PostList({ posts, setterFunction, userLikes, setUserLikes }: IProps) {
    const { axiosRequest } = useAxios()
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)
    const [openComment, setOpenComment] = useState<string>('')
    const [commentText, setCommentText] = useState<string>('')



    const handleLikePost = async (postId: string) => {
        await axiosRequest('/posts/likePost', 'POST', { postId })
        setUserLikes(!userLikes)
        // let likedPost = posts.find(({ _id }) => _id === postId)
        // if (!likedPost) return notifyError('Post cannot be found')
        // if (likedPost.likes.includes(loggedUser!._id)) {
        //     const newLikes = likedPost.likes.filter(_id => _id !== loggedUser!._id)
        //     likedPost.likes = newLikes
        //     setterFunction([...posts, likedPost])
        // } else {
        //     const newLikes = [...likedPost.likes, loggedUser!._id]
        //     likedPost.likes = newLikes
        //     setterFunction([...posts, likedPost])
        // }
    }

    const handleLikeComment = async (postId: string, commentId: string) => {
        await axiosRequest('/posts/comments/likeComment', 'POST', { postId, commentId })
        setUserLikes(!userLikes)
        // let postWithCommentToLike = posts.find(({ _id }) => _id === postId)
        // if (!postWithCommentToLike) return notifyError('Post cannot be found')
        // if (postWithCommentToLike.comments && postWithCommentToLike.comments.length > 0) {
        //     let commentToLike = postWithCommentToLike.comments.find(({ _id }) => _id === commentId)
        //     if (!commentToLike) return notifyError('Comment cannot be found.')
        //     if (commentToLike.likes.includes(loggedUser!._id)) {
        //         const newCommentLikes = commentToLike.likes.filter(_id => _id !== loggedUser!._id)
        //         commentToLike.likes = newCommentLikes
        //         let commentsWithoutCommentToLike = postWithCommentToLike.comments.filter(({ _id }) => _id !== commentId)
        //         const newComments = [...commentsWithoutCommentToLike, commentToLike]
        //         postWithCommentToLike.comments = newComments
        //         setterFunction([...posts, postWithCommentToLike])
        //     } else {
        //         const newCommentLikes = [...commentToLike.likes, loggedUser!._id]
        //         commentToLike.likes = newCommentLikes
        //         let commentsWithoutCommentToLike = postWithCommentToLike.comments.filter(({ _id }) => _id !== commentId)
        //         const newComments = [...commentsWithoutCommentToLike, commentToLike]
        //         postWithCommentToLike.comments = newComments
        //         setterFunction([...posts, postWithCommentToLike])
        //     }
        // } else {
        //     return notifyError('This post had no comments.')
        // }
    }

    const handleNewComment = async (e: KeyboardEvent, postId: string) => {
        if (e.key === 'Enter') {
            const response = await axiosRequest('/posts/comments', 'POST', { text: commentText, postId })
            if (response.status === 400 || response.status === 404 || response.status === 401) {
                notifyError('Something went wrong!!')
            }
            if (response.status === 200) {
                notifySuccess('Comment posted')
                setCommentText('')
            }
        }
    }

    return (
        <List sx={{ maxHeight: '100%', overflow: 'auto' }}>
            {
                posts.map(post => (
                    <Box key={post._id} alignItems='center' sx={{ bgcolor: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start', p: 2, my: 2 }}>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                            <ListItemAvatar sx={{ mt: 1.05 }}>
                                <Avatar alt='personAvatar' src={post.sender.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={`${post.sender.firstName} ${post.sender.lastName}`} secondary={format(parseISO(post.createdAt), 'HH:mm dd/MM/yyyy')} />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography>{post.text}</Typography>
                        </Box>
                        {post.image && <Box component='img' sx={{ maxHeight: 150, maxWidth: 150, alignSelf: 'center' }} alt='Post image' src={post.image} />}
                        <ListItem sx={{ display: 'flex', justifyContent: 'space-around', mt: 3, bgcolor: 'rgba(0,0,0,1)' }}>
                            <ListItemIcon><ListItemButton onClick={() => handleLikePost(post._id)}>{post.likes.find(_id => _id === loggedUser?._id) ? <ThumbUpIcon sx={{ fontSize: '1.7rem' }} /> : <ThumbUpOutlinedIcon sx={{ fontSize: '1.7rem' }} />}</ListItemButton></ListItemIcon>
                            <ListItemIcon><ListItemButton onClick={() => setOpenComment(post._id)}><CommentIcon sx={{ fontSize: '1.7rem' }} /></ListItemButton></ListItemIcon>
                        </ListItem>
                        {
                            openComment === post._id &&
                            <Box sx={{ width: '100%' }}>
                                <ListItem sx={{ display: 'flex', justifyContent: 'space-around', pt: 0.3, bgcolor: 'rgba(0,0,0,1)' }}>
                                    <Avatar alt='Your avatar' src={loggedUser?.avatar} sx={{ mt: 1, mr: 1, ml: -1 }} />
                                    <Input fullWidth multiline inputProps={ariaLabel} value={commentText} onChange={e => setCommentText(e.target.value)} onKeyPress={(e) => handleNewComment(e, post._id)} />
                                </ListItem>
                                {
                                    post.comments && post.comments.map(comment => (
                                        <Box key={comment._id} sx={{ mt: 1, ml: 4, display: 'flex', border: '1px solid #f5faff', p: -1, borderRadius: 4 }}>
                                            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Avatar alt='user name' src={comment.sender.avatar} sx={{ mt: 1, mr: 1, ml: -1 }} />
                                                <Typography variant='body2'>{comment.text}</Typography>
                                                <ListItemIcon sx={{ ml: 'auto' }}><ListItemButton onClick={() => handleLikeComment(post._id, comment._id)}>{comment.likes.includes(loggedUser!._id) ? <ThumbUpIcon sx={{ fontSize: '1.4rem' }} /> : <ThumbUpOutlinedIcon sx={{ fontSize: '1.4rem' }} />}</ListItemButton></ListItemIcon>
                                            </ListItem>
                                        </Box>
                                    ))}
                            </Box>
                        }
                    </Box>
                ))
            }
        </List>
    )
}
