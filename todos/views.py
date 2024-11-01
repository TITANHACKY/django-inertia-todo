import json

from django.contrib import messages
from django.http import JsonResponse
from inertia import render, inertia
# from inertia.share import inertia_validate
from django.shortcuts import get_object_or_404, redirect
from .models import Todo
from .forms import TodoForm
from .utils import CustomDatatable


def todo_list(request):
    todos = Todo.objects.all()
    return render(request, 'Todos', props={
        # 'todos': [{'id': todo.id, 'title': todo.title, 'completed': todo.completed} for todo in todos]
        'todos': []
    })

class TodoListDatatable(CustomDatatable):
    model = Todo

    column_defs = [
        {"name": "id", "visible": False, "searchable": False},
        {"name": "title", "visible": True, "searchable": True},
        {"name": "completed", "visible": True, "searchable": True},
    ]
    
    def customize_row(self, row, obj):
        row["completed"] = obj.completed
        return row


@inertia('create/')
def todo_create(request):
    if request.method == 'POST':
        form = TodoForm(json.loads(request.body))
        if form.is_valid():
            form.save()
            messages.success(request, 'Todo created successfully!')
            return redirect("todo_list")
        else:
            response = render(request, 'Create', props={
                'errors': {
                    "title": form.errors.get('title', None)
                }
            })
            return response

    return render(request, 'Create')


def todo_edit(request, id):
    todo = get_object_or_404(Todo, id=id)

    if request.method == 'PUT':
        form = TodoForm(json.loads(request.body), instance=todo)
        if form.is_valid():
            form.save()
            messages.success(request, 'Todo updated successfully!')
            return redirect("todo_list")
        else:
            return JsonResponse({"errors": form.errors}, status=400)


# @inertia('delete/')
def todo_delete(request, id):
    todo = get_object_or_404(Todo, id=id)
    todo.delete()
    return JsonResponse({"message": "Todo deleted successfully!"})
