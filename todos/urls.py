from django.urls import path
from . import views

urlpatterns = [
    path("", views.todo_list, name="todo_list"),
    path("datatable", views.TodoListDatatable.as_view(), name="todo_list_datatable"),
    path("create", views.todo_create, name="todo_create"),
    path("edit/<int:id>", views.todo_edit, name="todo_edit"),
    path("delete/<int:id>", views.todo_delete, name="todo_delete"),
]
