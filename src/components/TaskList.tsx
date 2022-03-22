import { IconProps } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React, { JSXElementConstructor } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import CreateTaskModal from './CreateTaskModal'
import TaskCard from './TaskCard'

export interface ITask {
    id: string
    status: string
    title: string
    description: string
}

interface IProps {
    droppableId: string
    listTitle: string
    icon: IconProps
    tasks: ITask[]
    setterFunction: React.Dispatch<React.SetStateAction<ITask[]>>
}

export default function TaskList({ droppableId, listTitle, icon, tasks, setterFunction }: IProps) {
    return (
        <div>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', borderBottom: `${snapshot.isDraggingOver && '4px solid rgba(229,242,255,0.25)'}`, width: `${snapshot.isDraggingOver && '75%'}` }}>
                            <Typography variant='h5' pt={1.25} >{listTitle}</Typography>
                            {icon}
                        </Box>
                        {
                            tasks.map((task, i) => (
                                <TaskCard key={task.id} id={task.id} index={i} status={task.status} title={task.title} description={task.description} />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}
