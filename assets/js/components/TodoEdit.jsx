import React from 'react'
import { useForm } from '@inertiajs/inertia-react'

export default function TodoEdit({ todo }) {
  // useForm is called at the top level of the component
  const { data, setData, put, errors } = useForm({
    title: todo.title,
    completed: todo.completed,
  })

  function handleSubmit(e) {
    e.preventDefault()
    put(`/edit/${todo.id}/`)
  }

  return (
    <div>
      <h1>Edit Todo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={data.title}
            onChange={e => setData('title', e.target.value)}  // Update form data
          />
          {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}  {/* Show error if present */}
        </div>

        <div>
          <label>Completed:</label>
          <input
            type="checkbox"
            checked={data.completed}
            onChange={e => setData('completed', e.target.checked)}  // Update form data
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  )
}
