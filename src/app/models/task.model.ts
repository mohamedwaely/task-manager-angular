export interface Task{
    taskId: number,
    description: string,
    status: 'new' | 'inprogress' | 'completed',
    createdAt: string
} 