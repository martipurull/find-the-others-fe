import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { IInitialState, IPost } from '../types'
import { useSelector } from 'react-redux'
import useAxios from '../hooks/useAxios'
import IconButton from '@mui/material/IconButton'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PostList from './PostList'
import { notifyError, notifySuccess } from '../hooks/useNotify'

const ariaLabel = { 'aria-label': 'description' }

export default function MusicianPostList() {
    const { axiosRequest } = useAxios()
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)
    const [newPostText, setNewPostText] = useState<string>('')
    const [postImgFile, setPostImgFile] = useState<File>()
    const [postImgPreview, setPostImgPreview] = useState<string>('')
    const [posts, setPosts] = useState<IPost[]>([])
    const [userLikes, setUserLikes] = useState(false)

    const handlePostImgUpload = (e: ChangeEvent<HTMLInputElement>) => {
        setPostImgFile(e.target.files![0])
        const imgUrl = URL.createObjectURL(e.target.files![0])
        setPostImgPreview(imgUrl)
    }
    const handleRemovePostImg = () => {
        setPostImgFile(undefined)
        URL.revokeObjectURL(postImgPreview)
        setPostImgPreview('')
    }

    const handleNewPost = async (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            const dataToAxios = new FormData()
            dataToAxios.append('text', newPostText)
            postImgFile && dataToAxios.append('postImage', postImgFile)
            const response = await axiosRequest('/posts', 'POST', dataToAxios)
            if (response.status === 400 || response.status === 404 || response.status === 401) {
                notifyError('Something went wrong!')
            }

            if (response.status === 201) {
                notifySuccess('Posted!')
                setNewPostText('')
                setPostImgFile(undefined)
                setPostImgPreview('')
                fetchPosts()
            }
        }
    }

    const fetchPosts = async () => {
        const response = await axiosRequest('/posts', 'GET')
        setPosts(response.data)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        let fetchThemPosts = true
        fetchPosts()
        return () => {
            fetchThemPosts = false
        }
    }, [userLikes])

    return (
        <div>
            <Box sx={{ width: '90%', display: 'flex', flexDirection: 'column', height: '75vh' }}>
                <Box component='form' sx={{ bgcolor: 'rgba(0,0,0,1)', display: 'flex', flexDirection: 'column', alignItems: 'center', my: 1.5, pb: 2 }}>
                    <ToastContainer position="top-right" newestOnTop={false} rtl={false} pauseOnFocusLoss toastStyle={{ backgroundColor: '#233243', border: 'none', color: '#f5faff', fontSize: '12px' }} />
                    <Box sx={{ display: 'flex', py: 2, px: 1, justifyContent: 'space-around', bgcolor: 'inherit' }}>
                        <Avatar alt='user name' src={loggedUser?.avatar} sx={{ m: 1 }} />
                        <Input multiline placeholder='Share your creative thoughts...' inputProps={ariaLabel} value={newPostText} onChange={e => setNewPostText(e.target.value)} onKeyPress={handleNewPost} />
                        <IconButton component='label'>
                            <Avatar sx={{ mt: 1 }}><AddAPhotoIcon /></Avatar>
                            <input type='file' hidden onChange={e => handlePostImgUpload(e)} />
                        </IconButton>
                    </Box>
                    {
                        postImgPreview &&
                        <Box sx={{ position: 'relative' }}>
                            <IconButton sx={{ position: 'absolute', left: '85%', top: '-3%' }} onClick={handleRemovePostImg} ><HighlightOffSharpIcon /></IconButton>
                            <Box component='img' src={postImgPreview} sx={{ height: '150px', objectFit: 'cover' }} />
                        </Box>
                    }
                </Box>
                <PostList posts={posts} setterFunction={setPosts} userLikes={userLikes} setUserLikes={setUserLikes} />
            </Box>
        </div>
    )
}
