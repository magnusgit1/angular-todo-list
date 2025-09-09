import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  router = inject(Router)
  service = inject(TodoService)

  todos = this.service.todos;
  showComplete = this.service.showCompleted

  ngOnInit() {
    this.todos = this.service.getTodos().pipe(
        map(todos => todos.filter(todo => !todo.completed))
      );
  }

  onToggle(){
    if (this.service.showCompleted){
      this.service.showCompletedToggle()
      this.todos = this.service.getTodos().pipe(
        map(todos => todos.filter(todo => !todo.completed))
      );
      this.showComplete = this.service.showCompleted
    } else {
      this.service.showCompletedToggle()
      this.refreshTodos(false)
      this.showComplete = this.service.showCompleted
    }
  }

  updateTodo(todo: Todo) {
    this.service.updateTodo(todo).subscribe()
  }

  refreshTodos(added: Boolean): void {
    if (!this.showComplete && added){
      this.todos = this.service.getTodos().pipe(
        map(todos => todos.filter(todo => !todo.completed))
      );
    }
    else if (!this.showComplete || added && this.showComplete){
      this.todos = this.service.getTodos();
    } else {
      this.todos = this.service.getTodos().pipe(
        map(todos => todos.filter(todo => !todo.completed))
      );
    }
  }

  async newTodo(title: string) {
    this.service.addTodo(title);
    this.service.addTodo(title).subscribe({next: (todo) => this.refreshTodos(true)});
  }
}
