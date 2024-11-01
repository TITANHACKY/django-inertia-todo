import React, { useEffect } from 'react';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';
import $ from 'jquery'; // Make sure jQuery is also installed and imported
import 'parsleyjs'; // Ensure you have Parsley.js imported

export default function TodoCreate() {

  // Hooks are correctly called at the top level
  const { data, setData, post, errors } = useForm({
    title: '',
  });

  const formRef = React.useRef();
  
  useEffect(() => {
    // Initialize Parsley
    $(formRef.current).parsley();
  }, []);

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault()
    const isValid = $(formRef.current).parsley().validate();
    if (!isValid) {
        return; // Prevent form submission if validation fails
    }

    post('/create', {
      onSuccess: () => {
        Swal.fire({
            title: "Created!",
            text: `${data.title} has been created.`,
            icon: "success"
        });
      },
      onError: () => {
        $(formRef.current).parsley().reset();
      },
    })
  }

  useEffect(() => {
    for (const [field, messages] of Object.entries(errors)) {
        const inputField = $(formRef.current).find(`[name="${field}"]`);
        console.log(inputField);

        console.log("Field:", field); 
        messages.forEach(message => {
            console.log(message);
            inputField.parsley().addError('errro', { message });
        });
    }
  }, [errors]);

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
                <h3>Creat Todo</h3>
                <p className="text-subtitle text-muted">Create a new todo item</p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><InertiaLink href="/">Todo List</InertiaLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Create Todo</li>
                    </ol>
                </nav>
            </div>
        </div>
      </div>
       <section className="section">
        <div className="card">
            <form ref={formRef} onSubmit={handleSubmit} className='col-md-4 col-sm-6 col-6 m-3' data-parsley-validate="">
              <input
                type="text"
                className="form-control"
                placeholder="Enter todo title"
                name="title"
                onChange={e => setData('title', e.target.value)}
                required
              />

              {/* Render error messages properly */}
              {/* {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>} */}
              <button className='btn btn-primary mt-2' type="submit">Create</button>
            </form>
          </div>
        </section>
    </div>
  )
}
