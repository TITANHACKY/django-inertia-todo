import { useRef, useEffect } from "react";
import { useForm } from '@inertiajs/inertia-react'
import Swal from "sweetalert2";
import axios from "axios";
import $ from 'jquery'; // Make sure jQuery is also installed and imported
import 'parsleyjs'; // Ensure you have Parsley.js imported


export default function TodoEditModal({ show, todo, handleClose }) {

    const { data, setData, put, errors } = useForm({
        title: todo.title,
        completed: todo.completed,
    })

    const formRef = useRef();

    useEffect(() => {
        // Add the backdrop dynamically when modal is open
        if (show) {
            $(formRef.current).parsley().reset(); // Initialize Parsley
            document.body.classList.add("modal-open"); // Prevent scrolling
            const backdrop = document.createElement("div");
            backdrop.className = "modal-backdrop fade show";
            document.body.appendChild(backdrop);
        } else {
            document.body.classList.remove("modal-open"); // Re-enable scrolling
            const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) {
                backdrop.remove(); // Remove backdrop when modal is closed
            }
        }
        setData(todo);

        // Clean up on unmount or when modal is closed
        return () => {
            document.body.classList.remove("modal-open");
            const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) {
                backdrop.remove();
            }
        };
    }, [show, todo]);


    function handleSubmit(e) {
        e.preventDefault()

        const isValid = $(formRef.current).parsley().validate();
        if (!isValid) {
            return; // Prevent form submission if validation fails
        }

        axios.put(`/edit/${todo.id}`, data)
            .then(response => {
                console.log(response);
                handleClose();
                Swal.fire({
                    title: "Updated!",
                    text: `${todo.title} has been updated.`,
                    icon: "success"
                });
            })
            .catch(error => {
                if (error.response && error.response.data.errors) {
                    // Clear previous errors
                    $(formRef.current).parsley().reset();

                    // Loop through the errors and add them to the fields
                    for (const [field, messages] of Object.entries(error.response.data.errors)) {
                        const inputField = $(formRef.current).find(`[name="${field}"]`);
                        if (inputField.length) {
                            messages.forEach(message => {
                                inputField.parsley().addError('errro', { message });
                            });
                        }
                    }
                }
            })
    }

    return (
        <div className={`modal fade ${show ? 'show' : ''}`} id="inlineForm" tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}
            aria-labelledby="myModalLabel33" aria-hidden={!show}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Todo Edit Form </h4>
                        <button type="button" className="close" data-bs-dismiss="modal"
                            aria-label="Close" onClick={handleClose}>
                            <i data-feather="x"></i>
                        </button>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} id="parsley-form-validation" data-parsley-validate="">
                        <div className="modal-body">
                            <label htmlFor="title">Title: </label>
                            <div className="form-group">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Title"
                                    className="form-control"
                                    onChange={e => setData('title', e.target.value)}
                                    value={data.title}
                                    required
                                />
                            </div>
                            <label htmlFor="completed">Completed: </label>
                            <div className="form-group">
                                <input
                                    id="completed"
                                    name="completed"
                                    type="checkbox"
                                    placeholder="Completed"
                                    // className="form-control"
                                    onChange={e => setData('completed', e.target.checked)}
                                    checked={data.completed || false}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light-secondary"
                                data-bs-dismiss="modal" onClick={handleClose}>
                                <i className="bx bx-x d-block d-sm-none"></i>
                                <span className="d-none d-sm-block">Close</span>
                            </button>
                            <button type="submit" className="btn btn-primary ms-1"
                                data-bs-dismiss="modal">
                                <i className="bx bx-check d-block d-sm-none"></i>
                                <span className="d-none d-sm-block">Update</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}