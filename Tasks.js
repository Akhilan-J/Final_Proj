//Personalized greeting
let greet = "";
let name = localStorage.getItem("name");

if (!name) {
  name = prompt("What's your name?");
  if (name) localStorage.setItem("name", name);
}

const profileBtn = document.getElementById("name-change");
profileBtn.addEventListener("click", () => {
  name = prompt("What's your name?");
  if (name) localStorage.setItem("name", name);
  const greeting = document.getElementById("Greeting");
  greeting.innerText = `${name}'s Tasks`;
});

const greeting = document.getElementById("Greeting");
greeting.innerText = `${name}'s Tasks`;

//Tasks
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todos");

document.addEventListener("DOMContentLoaded", () => getLocalTodos());
todoButton.addEventListener("click", (e) => addTodo(e));
todoList.addEventListener("click", (e) => deleteCheck(e));

function addTodo(event) {
  event.preventDefault();
  // dont add null values
  if (!todoInput.value.trim()) return;

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodos({ text: todoInput.value, completed: false });

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // to get the rigt element to delete
  if (
    item.classList[0] === "trash-btn" ||
    item.parentElement.classList[0] === "trash-btn"
  ) {
    const todo =
      item.classList[0] === "trash-btn"
        ? item.parentElement
        : item.parentElement.parentElement;
    removeLocalTodos(todo);

    todo.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    todo.style.opacity = "0";

    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  if (
    item.classList[0] === "complete-btn" ||
    item.parentElement.classList[0] === "complete-btn"
  ) {
    const todo =
      item.classList[0] === "complete-btn"
        ? item.parentElement
        : item.parentElement.parentElement;
    todo.classList.toggle("completed");
    updateTodoCompletion(todo);
  }
}

function saveLocalTodos(todoObj) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todos);
  todos.push(todoObj);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todoObj) {
    const todoText = typeof todoObj === "string" ? todoObj : todoObj.text;
    const isCompleted = typeof todoObj === "object" ? todoObj.completed : false;

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    if (isCompleted) {
      todoDiv.classList.add("completed");
    }

    const newTodo = document.createElement("li");
    newTodo.innerText = todoText;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoText = todo.children[0].innerText;
  todos = todos.filter((todoObj) => {
    const text = typeof todoObj === "string" ? todoObj : todoObj.text;
    return text !== todoText;
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodoCompletion(todoElement) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoText = todoElement.children[0].innerText;
  const isCompleted = todoElement.classList.contains("completed");

  todos = todos.map((todoObj) => {
    if (typeof todoObj === "string") {
      if (todoObj === todoText) {
        return { text: todoObj, completed: isCompleted };
      }
      return { text: todoObj, completed: false };
    } else {
      if (todoObj.text === todoText) {
        return { ...todoObj, completed: isCompleted };
      }
      return todoObj;
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

//Light or dark mode
let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

if (darkmode === "active") {
  document.body.classList.add("darkmode");
} else {
  document.body.classList.remove("darkmode");
}

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
