import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  router = inject(Router)
  service = inject(TodoService)

  todos = this.service.todos;

  updateTodo(todo: Todo) {
    this.service.updateTodo(todo).subscribe()
  }

  refreshTodos(): void {
    this.todos = this.service.getTodos();
  }

  async newTodo(title: string) {
    this.service.addTodo(title);
    this.service.addTodo(title).subscribe({next: (todo) => this.refreshTodos()});
    this.todos = this.service.todos
  }
}
