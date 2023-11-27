// JavaScript for UI
function init() {
    let infoText = document.getElementById('infoText')
    infoText.innerHTML = 'Loading todos, please wait...'
    loadTodos()
}
  
async function loadTodos() {
    try {
        console.log('Loading todos...');
        let response = await fetch('http://localhost:3000/todos');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let todos = await response.json();
        console.log('Todos:', todos);
        showTodos(todos);
        } catch (error) {
        console.error('Error loading todos:', error.message);
        }
}

function createTodoListItem(todo) {
    // create a new  LI element
    let li = document.createElement('li')
    // create a new id attribute
    let li_attr = document.createAttribute('id')
    // add todo id value to attribute
    li_attr.value= todo._id
    // add attribute to LI element
    li.setAttributeNode(li_attr)
    // add a new text node with todo text
    let text = document.createTextNode(todo.text)
    // add text node to LI element
    li.appendChild(text)
    // create a new SPAN element, x char -> delete todo
    let span = document.createElement('span')
    // create a new attribute
    let span_attr = document.createAttribute('class')
    // add delete value (look css)
    span_attr.value = 'delete'
    // add attribute to SPAN element 
    span.setAttributeNode(span_attr)
    // create a text node with x text
    let x = document.createTextNode(' x ')
    // add text node to SPAN element 
    span.appendChild(x)
    // add event listener to SPAN element, onclick event call removeTodo function
    span.onclick = function() { removeTodo(todo._id) }
    // add SPAN element to LI element
    li.appendChild(span)
    // return created LI element 
    // will be following formula: <li>Call Esa!<span class="remove">x</span></li>
    return li
}

function showTodos(todos) {
    let todosList = document.getElementById('todosList')
    let infoText = document.getElementById('infoText')
    // no todos
    if (todos.length === 0) {
        infoText.innerHTML = 'No Todos'
    } else {    
        todos.forEach(todo => {
            let li = createTodoListItem(todo)        
            todosList.appendChild(li)
        })
        infoText.innerHTML = ''
    }
}

async function removeTodo(id) {
    const response = await fetch('http://localhost:3000/todos/'+id, {
    method: 'DELETE'
    })
    let responseJson = await response.json()
    let li = document.getElementById(id)
    li.remove()

    let todosList = document.getElementById('todosList')
    if (!todosList.hasChildNodes()) {
    let infoText = document.getElementById('infoText')
    infoText.innerHTML = 'No Todos'
    }
}

async function addTodo() {
    let newTodo = document.getElementById('newTodo')
    const data = { 'text': newTodo.value }
    const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    let todo = await response.json()
    let todosList = document.getElementById('todosList')
    let li = createTodoListItem(todo)
    todosList.appendChild(li)

    let infoText = document.getElementById('infoText')
    infoText.innerHTML = ''
    newTodo.value = ''
}
  
function createEditButton(todo) {
    let editButton = document.createElement('button');
    editButton.innerText = 'e';
    editButton.classList.add('edit-button'); // Add a class
    editButton.onclick = function() {
        editTodo(todo._id, todo.text);
    };
    return editButton;
}

function createDeleteButton(id) {
    let button = document.createElement('button');
    button.textContent = 'x';
    button.classList.add('delete-button');
    button.addEventListener('click', () => {
    removeTodo(id);
    });
    return button;
}
    
function editTodo(id, text) {
    let newTodo = document.getElementById('newTodo');
    newTodo.value = text;
    let addTodoButton = document.getElementById('addTodoButton');
    addTodoButton.innerText = 'Save';
    addTodoButton.onclick = function() {
    saveUpdatedTodo(id);
    };
}

async function saveUpdatedTodo(id) {
    let newTodo = document.getElementById('newTodo');
    const data = { text: newTodo.value };
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    });

    let updatedTodo = await response.json();
    let todosList = document.getElementById('todosList');
    let li = createTodoListItem(updatedTodo);
    todosList.appendChild(li);

    resetForm();
}

function resetForm() {
    let newTodo = document.getElementById('newTodo');
    let addTodoButton = document.getElementById('addTodoButton');
    newTodo.value = '';
    addTodoButton.innerText = 'Add';
    addTodoButton.onclick = function() {
    addTodo();
    };
}

function createTodoListItem(todo) {
    let li = document.createElement('li');
    let li_attr = document.createAttribute('id');
    li_attr.value = todo._id;
    li.setAttributeNode(li_attr);
    let text = document.createTextNode(todo.text);
    li.appendChild(text);

    let editButton = createEditButton(todo);
    li.appendChild(editButton);

    let deleteButton = createDeleteButton(todo);
    li.appendChild(deleteButton);

    return li;
}