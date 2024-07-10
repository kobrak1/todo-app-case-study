import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import todoService from '../services/todoService'
import { message } from 'antd'

// fetch all todos
export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],  // unique key for this query
    queryFn: todoService.getAll,
    staleTime: 1000 * 60 * 5,  // data remains fresh for 5 minutes
    cacheTime: 1000 * 60 * 10,  // cache data for 10 minutes
  })
}

// fetch a specific todo by ID
export const useTodo = (id) => {
  return useQuery({
    queryKey: ['todo', id],  // unique key for this query
    queryFn: () => todoService.getTodo(id),
    enabled: !!id,  // only run the query if id exists
    staleTime: 1000 * 60 * 5,  // data remains fresh for 5 minutes
  })
}

// create a new todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])  // refetch todos after creating a new one
    },
    onError: (error) => {
      console.error('Error creating todo:', error)
      message.error('Craetion failed!')
    },
  })
}

// update an existing todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (todoObject) => todoService.update(todoObject.id, todoObject),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])  // refetch todos after updating
      queryClient.invalidateQueries(['todo', todoObject.id])  // refetch the specific todo
    },
    onError: (error) => {
      console.error('Error updating todo:', error)
      message.error('Update failed!')
    },
  })
}

// delete a todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todoService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])  // refetch todos after deleting
    },
    onError: (error) => {
      console.error('Error deleting todo:', error)
      message.error('Removal failed!')
    },
  })
}
