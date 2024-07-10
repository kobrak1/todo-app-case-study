import { useTodos } from '../../hooks/useTodo'

const TodoList = () => {
  const { data: todos = [], isLoading, isError } = useTodos()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading todos</p>

  return (
    <div>
      {todos.map(item => (
        <li key={item.id}> {item.text} </li>
      ))}
    </div>
  )
}

export default TodoList
