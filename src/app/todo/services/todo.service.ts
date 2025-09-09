import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient)

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}`)
  }

  addTodo(title: string): Observable<Todo> {
    return this.http.post<Todo>(`${environment.apiUrl}`, { title:title})
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const body = { title: updatedTodo.title, completed: updatedTodo.completed }
    return this.http.put<Todo>(`${environment.apiUrl}/${updatedTodo.id}`, body)
  }

  todos: Observable<Todo[]> = this.getTodos();
}
