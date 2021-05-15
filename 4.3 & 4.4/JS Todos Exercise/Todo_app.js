/* Part 1
For this assignment you will be combining your knowledge of 
DOM access and events to build a todo app!

As a user, you should be able to:

Add a new todo (by submitting a form)
Mark a todo as completed (cross out the text of the todo)
Remove a todo
Part 2
Now that you have a functioning todo app, save your todos in 
localStorage! Make sure that when the page refreshes, the todos 
on the page remain there.*/

const enterNewItem = document.querySelector('#enter_item');
const textInput = document.querySelector('#text_in');
const todoList = document.querySelector('#Todo_List');
const li_elements = todoList.querySelectorAll('li');
let list_store = [];

if (localStorage.getItem('list_store')) {
    list_store = JSON.parse(localStorage.getItem('list_store'));
    for (let todo_text of list_store) {
        let newTodo = document.createElement('li');
        newTodo.innerText = todo_text;
        newTodo.classList.toggle('list_item');
        todoList.append(newTodo);   
    }
}

enterNewItem.addEventListener('click', function(e) {
    e.preventDefault();
    if (textInput.value === '') {
        alert('Todo Item Entry is Empty!')
    }
    else {
        let newTodo = document.createElement('li');
        newTodo.innerText = textInput.value;
        newTodo.classList.toggle('list_item');
        todoList.append(newTodo);
        list_store.push(newTodo.innerText);
        localStorage.setItem('list_store', JSON.stringify(list_store));
    }  
    })
    

todoList.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
    }
})

todoList.addEventListener('dblclick', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.remove()
        list_store = [];
        const li_elements = todoList.querySelectorAll('li');
        for (let li of li_elements) {
            list_store.push(li.innerText);
        }
        localStorage.setItem('list_store', JSON.stringify(list_store));
    }
})

//EVENT DELEGATION
//can do this manually, when we create a new element, just add an event listener there
//this sets us up to potentially have a lot of event listeners
//OR, we could make an event delegate (set up listener on the parent element, then detect which child was interacted with)
//use 'tagName' to do this
/* EXAMPLE - you can set multiple element actions w/ one delegate listener
variableHoldingElement.addEventListener('click', function(e) {
    if(e.target.tagName === 'BUTTON') {
            e.target.parentElement.remove();
    }
    else if (e.target.tagName === 'LI') {
        e.target.classList.add('best-friend');
        const heart = document.createElement('span');
        heart.innerHTML = '&hearts;';
        e.target.prepend(heart);
    }
});
*/
