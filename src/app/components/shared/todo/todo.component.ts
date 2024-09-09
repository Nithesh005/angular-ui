import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo, TodoService } from '@service/todo.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  standalone:true,
  imports:[CommonModule,FormsModule]
})
export class TodoComponent implements OnInit {
  todos!: Todo[];

  newTodoTitle = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todos$.subscribe(todos => (this.todos = todos));
  }

  addTodo() {
    if (!this.newTodoTitle) return;
    const newTodo: Todo = {
      id: this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1,
      title: this.newTodoTitle,
      completed: false
    };
    this.todoService.addTodo(newTodo);
    this.newTodoTitle = '';
  }

  removeTodo(id: number) {
    this.todoService.removeTodo(id);
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }
}

