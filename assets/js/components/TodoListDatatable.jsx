import React, { forwardRef, useEffect, useState } from "react"
import $ from 'jquery'
import DataTables from "datatables.net"
import 'datatables.net-bs5';
import "../../dist//extensions/datatables.net-bs5/css/dataTables.bootstrap5.min.css"
import "../../dist/compiled/css/table-datatable-jquery.css"
import TodoEditModal from "./TodoEditModal";
import Swal from "sweetalert2";
import axios from "axios";

 
export const TodoListDatatable = forwardRef((props, tableRef) => {

    $.DataTable = DataTables
    const [modalShow, setModalShow] = useState(false); // State to manage modal visibility
    const [selectedData, setSelectedData] = useState(null); // State to hold the data being edited

    useEffect(() => {
        const table = $(tableRef.current).DataTable(
            {
                serverSide: true,
                columns: [
                    { "title": "Title", "data": "title"},
                    { 
                        "title": "Completed",
                        "data": "completed",
                        render: function (data, type, row) {
                            return data ? "Yes" : "No";
                        }
                    },
                    {
                        title: "Action",
                        data: null,
                        render: function (data, type, row) {
                            return `
                            <button class="btn icon btn-edit" data-id="${row.id}"><i class="bi bi-pencil"></i></button>
                            <button class="btn icon btn-delete" data-id="${row.id}"><i style="color: red" class="bi bi-trash"></i></button>
                            `;
                        },
                        orderable: false,
                    },
                ],
                ajax: {
                    url: '/datatable',
                    type: 'POST',
                }
            }
        )
        // Clean up old event listeners
        $(tableRef.current).off("click");
        $(tableRef.current).on('click', '.btn-edit', function () {
            const rowData = table.row($(this).parents('tr')).data();
            handleEdit(rowData);
        });

        $(tableRef.current).on('click', '.btn-delete', function () {
            const rowId = $(this).data('id');
            handleDelete(rowId);
        });
        // Extra step to do extra clean-up.
        return function() {
            table.destroy()
        }
    }, [props.data])

    function handleEdit(data) {
        setSelectedData(data);
        setModalShow(true);
    }

    function handleClose() {
        const table = $(tableRef.current).DataTable();
        table.ajax.reload(() => {
        }, false);

        setModalShow(false);
    }

    function handleDelete(id) {
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`/delete/${id}`)
            .then(response => {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                const table = $(tableRef.current).DataTable();
                table.ajax.reload(() => {
                }, false);
            })
        }
        });
    }

    return (
        <div className="card-body">
            <div className="table-responsive">
                <table className="table" id="table1" width="100%" ref={tableRef}>
                </table>
                {selectedData && (
                    <TodoEditModal
                    show={modalShow}
                    handleClose={handleClose}
                    todo={selectedData}
                    />
                )}
            </div>
        </div>
    )
});