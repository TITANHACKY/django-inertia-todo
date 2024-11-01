import React from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import { TodoListDatatable } from './TodoListDatatable';


export default function TodoList() {
  // Call usePage at the top level
  const { props } = usePage();
  const { todos, flash, errors } = props;  // Destructure todos and flash messages from props

  React.useEffect(() => {
    const message = flash?.success;  // Safe access to flash message
    if (message) {
      alert(message);  // Display the flash message correctly
      console.log(message);
    }
  }, [flash]);  // Add flash as a dependency to avoid unnecessary re-renders

  function handleDelete(id) {
    if (confirm('Are you sure you want to delete this todo?')) {
      Inertia.delete(`/delete/${id}`);
    }
  }

  const tableRef = React.useRef()

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
                <h3>Todo List</h3>
                <p className="text-subtitle text-muted">A simple todo list app</p>
            </div>
        </div>
      </div>
      <section className="section">
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">
                    Minimal jQuery Datatable
                </h5>
            </div>
            <TodoListDatatable data={todos} ref={tableRef} />
        </div>
    </section>
    </div>
  )
}
