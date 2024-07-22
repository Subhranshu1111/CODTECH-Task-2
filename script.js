

const form = document.querySelector('[data-form]');
const lists = document.querySelector('[data-lists]');
const input = document.querySelector('[data-input]');

// Local Storage handling
class Storage {
  static getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
  }

  static saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

// Todo Class
class Todo {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

// UI Class
class UI {
  static displayTodos() {
    const todos = Storage.getTodos();
    lists.innerHTML = todos.map(todo => UI.createTodoElement(todo)).join('');
  }

  static createTodoElement(todo) {
    return `
      <div class="todo">
        <p>${todo.text}</p>
        <span class="remove" data-id="${todo.id}">🗑️</span>
      </div>
    `;
  }

  static clearInput() {
    input.value = '';
  }

  static removeTodoFromUI(id) {
    const todoElement = document.querySelector(`[data-id="${id}"]`).parentElement;
    todoElement.remove();
  }
}

// Event listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoText = input.value.trim();
  if (todoText === '') return;

  const newTodo = new Todo(Date.now(), todoText);
  const todos = Storage.getTodos();
  todos.push(newTodo);
  Storage.saveTodos(todos);
  UI.displayTodos();
  UI.clearInput();
});

lists.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const todos = Storage.getTodos().filter(todo => todo.id !== id);
    Storage.saveTodos(todos);
    UI.removeTodoFromUI(id);
  }
});

document.addEventListener('DOMContentLoaded', UI.displayTodos);
