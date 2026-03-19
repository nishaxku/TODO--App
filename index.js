console.log("wellcome my todo app")
let todos =[];

let todoDataList = document.getElementById('todo-data-list')
let saveButton = document.getElementById('save-todo')
let todoInputBar = document.getElementById('todo-input-bar')

todoInputBar.addEventListener('keyup', function toggleSaveButton() {
    let todotext = todoInputBar.value;
    if(todotext.length == 0){
        if(saveButton.classList.contains('disabled')) return;
        saveButton.classList.add('disabled');
    }
    else if(saveButton.classList.contains('disabled')){
        saveButton.classList.remove('disabled')
    }

})
saveButton.addEventListener('click',function getTextAndAddTodo(){
    let todotext = todoInputBar.value;
    if(todotext.length == 0)return;
    let todo = {text : todotext, status : 'In Progress', finishButtonText : 'Finished'}
    todos.push(todo)
    addTodo(todo, todos.length)
    todoInputBar.value = ''
})


function reRenderTodo(){
    todoDataList.innerHTML = "";
    todos.forEach((element,idx) => {
        addTodo(element,idx+1);
    })


}


function removeTodo(event){
    let deleteButtonPressed = event.target;
    let indexTobeRemoved = Number(deleteButtonPressed.getAttribute('todo-idx'));
    todos.splice(indexTobeRemoved, 1)
    reRenderTodo()
    
}

function finishTodo(event){
    let finishButtonPress = event.target
    let indexTobeFinish = finishButtonPress.getAttribute('todo-idx');
    // todos[indexTobeFinish].status = 'Finished';
    // todos[indexTobeFinish].finishButtonText = 'undo';
    if(todos[indexTobeFinish].status == 'Finished'){
        todos[indexTobeFinish].status = 'In Progress';
        todos[indexTobeFinish].finishButtonText = 'Finished';
    }
    else{
        todos[indexTobeFinish].status = 'Finished';
        todos[indexTobeFinish].finishButtonText = 'undo';
    }

    todos.sort((a,b)=>{
        if(a.status == 'Finished'){
            return 1;
        }
        return -1;
    });



     reRenderTodo()



}




function addTodo(todo,todoCount){
    console.log("caled add todo")
    let rowdiv = document.createElement("div");
    let todoitem = document.createElement("div");
    let todonumber = document.createElement("div");
    let todoDetils = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoAction = document.createElement("div");
    let deleteButton = document.createElement("button");
    let finshButton = document.createElement("button");
    let hr = document.createElement("hr")

    todonumber.textContent = `${todoCount}.`;
    todoDetils.textContent = todo.text;
    todoStatus.textContent = todo.status;
    deleteButton.textContent = "Delete";
    finshButton.textContent = todo.finishButtonText;
    

    todoitem.appendChild(todonumber);
    todoitem.appendChild(todoDetils);
    todoitem.appendChild(todoStatus);
    todoitem.appendChild(todoAction);

    todoAction.appendChild(deleteButton);
    todoAction.appendChild(finshButton);

    rowdiv.appendChild(todoitem);
    rowdiv.appendChild(hr);

    todoDataList.appendChild(rowdiv);


    // add class---

    todoitem.classList.add('todo-list-item','d-flex', 'flex-row', 'justify-content-between', 'align-items-center');
    rowdiv.classList.add('row');
    todonumber.classList.add('todo-no');
    todoDetils.classList.add('todo-details','text-muted');
    todoStatus.classList.add('todo-status','text-muted');
    todoAction.classList.add('todo-action','d-flex','justify-content-start','gap-2');
    deleteButton.classList.add('btn', 'btn-danger','delete-todo');
    finshButton.classList.add('btn', 'btn-success','finish-todo');


    finshButton.setAttribute('todo-idx',todoCount-1);
    deleteButton.setAttribute('todo-idx',todoCount-1);
    deleteButton.onclick = removeTodo;
    finshButton.onclick =  finishTodo;




     











}
























// referance
// let getTodoButton = document.getElementById('get-todo');
// getTodoButton.addEventListener("click",() => {
//     console.log("click");
// })
// getTodoButton.addEventListener("mouseover",handler)
// function handler(){
//     console.log("hello guys")
// }
// getTodoButton.onlick = () => {
//     console.log("clicked")
// }
// function clickBtn(){
//     console.log("hello click");
// }