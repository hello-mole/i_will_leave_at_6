const todoForm = document.getElementById("js-writeTodo");
const todoInput = document.querySelector("input");
const todoList = document.querySelector(".js-todolist");

let toDos = [];

const TODOS_LS = "todos"
const DELBTN_CL = "delBtn";

function deleteToDo(event){
    const btn = event.target;
    const div = btn.parentNode;
    todoList.removeChild(div);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(div.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentTodo = todoInput.value;
    paintTodo(currentTodo);
    todoInput.value="";
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text){
    const div = document.createElement("div");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newID = toDos.length + 1;
    delBtn.innerText = "❌";
    span.innerText = text;
    div.appendChild(span);
    div.appendChild(delBtn);
    div.id = newID;
    todoList.appendChild(div);
    const toDoObj = {
        text: text,
        id: newID
    };
    toDos.push(toDoObj);
    saveToDos();
    delBtn.addEventListener("click", deleteToDo);
}

function drawTodos(){
    const savedTodo = localStorage.getItem(TODOS_LS);
    if(savedTodo !== null){
        const parsedTodo = JSON.parse(savedTodo);
        parsedTodo.forEach(function(toDo){paintTodo(toDo.text);})
    }    
}

function init(){
    drawTodos()
    todoForm.addEventListener("submit", handleSubmit);
}

init()