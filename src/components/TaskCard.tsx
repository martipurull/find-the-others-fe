import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import CardActions from '@mui/material/CardActions'
import EditTaskModal from './EditTaskModal'
import MAvatar from '../assets/MAvatar.jpeg'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Draggable } from 'react-beautiful-dnd'

interface ITask {
    id: string
    status: string
    title: string
    description: string
    index: number
}

export default function TaskCard({ title, description, status, id, index }: ITask) {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <Card
                    sx={{ minWidth: 200, maxWidth: 300, my: 2, ml: -1, boxShadow: `${snapshot.isDragging && '0 0 20px rgba(229,242,255,0.25)'}` }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>{title}</Typography>
                            <Avatar src={MAvatar} />
                        </Box>
                        <Typography variant='body2'>{description}</Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <EditTaskModal />
                        <IconButton size='small'><DeleteOutlineIcon /></IconButton>
                    </CardActions>
                </Card>
            )}
        </Draggable>
    )
}
