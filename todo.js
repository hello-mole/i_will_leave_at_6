const todoForm = document.getElementById("js-writeTodo");
const todoInput = document.querySelector("input");
const todoList = document.querySelector(".js-todolist");
const allDel = document.querySelector(".js-allDel");

let toDos = [];
let done = [];

const TODOS_LS = "todos";
const FINISH_LS = "finish"
const DONE_CL = "donetodo" 

function handleDelAll(event){
    toDos = [];
    saveToDos();
    while(todoList.hasChildNodes()){
        todoList.removeChild(todoList.firstChild);
        localStorage.removeItem(FINISH_LS);
    }
}

function doneToDo(event){
    const btn = event.target;
    const div_2 = btn.parentNode;
    const div = div_2.parentNode;
    const doneID = div.id;
    const saved = localStorage.getItem(TODOS_LS);
    const parsedTodo2 = JSON.parse(saved);
    const result = parsedTodo2.find(what => what.id == doneID);
    if(!result.status){
        div.classList.add(DONE_CL);
        result.status = true;
        toDos = parsedTodo2;
        saveToDos();
    } else {
        div.classList.remove(DONE_CL);
        result.status = false;
        toDos = parsedTodo2;
        saveToDos();
    }
}

function deleteToDo(event){
    const btn = event.target;
    const div_2 = btn.parentNode;
    const div = div_2.parentNode;
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
    if(currentTodo.length !== 0){
        paintTodo(currentTodo, false);
        todoInput.value="";
    }
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// 추가
function handleSubmitMemo(event){
    event.preventDefault();
}

// 여기까지

function paintTodo(text, status){
    const div = document.createElement("div");
    const doneBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newID = toDos.length + 1;
    // 메모추가
    const divTodo = document.createElement("div");
    const divMemo = document.createElement("div");
    divMemo.classList.add("memo");
    doneBtn.innerText = "👌🏻";
    delBtn.innerText = "❌";
    span.innerText = text;
    divTodo.appendChild(span);
    divTodo.appendChild(doneBtn);
    divTodo.appendChild(delBtn);
    div.appendChild(divTodo);
    div.appendChild(divMemo);
    div.id = newID;
    todoList.appendChild(div);
    // 메모만들기
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.placeholder = "메모";
    form.appendChild(input);
    divMemo.appendChild(form);
    form.addEventListener("submit", handleSubmitMemo);
    if(status){
        div.classList.add(DONE_CL);
        status = true;
    }
    // 여기까지
    const toDoObj = {
        text: text,
        id: newID,
        status: status
    };
    toDos.push(toDoObj);
    saveToDos();
    doneBtn.addEventListener("click", doneToDo);
    delBtn.addEventListener("click", deleteToDo);
}

function drawTodos(){
    const savedTodo = localStorage.getItem(TODOS_LS);
    if(savedTodo !== null){
        const parsedTodo = JSON.parse(savedTodo);
        parsedTodo.forEach(function(toDo){paintTodo(toDo.text, toDo.status);})
    }
}

function init(){
    drawTodos()
    todoForm.addEventListener("submit", handleSubmit);
    allDel.addEventListener("click", handleDelAll);
}

init()