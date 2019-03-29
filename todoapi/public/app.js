var todosUrl = '/api/todos';
var todoList = document.getElementById('gridtodo');

document.addEventListener('DOMContentLoaded', function(){
  axios.get(todosUrl)
    .then(parseJSON)
    .then(addTodo)
    .catch(handleErrors);

  document.getElementById('add-todo-input').addEventListener("keypress", function(){
    if(event.which == 13){
      createTodo(this.value);
      this.value = '';
    }
  });

}, false);

function deleteTodo(){
  var parent = this.parentNode;
  console.log(parent.getAttribute("data-id"));
  axios.delete(todosUrl + "/" + parent.getAttribute("data-id"))
    .then(parent.remove())
    .catch(handleErrors);
}


function toggleTodo(){
  var cls = this.getAttribute("class");
  var completed = false;

  if(cls.split(" ")[1] == 'done'){
    this.classList.remove("done");
    completed = true;
  } else {
    this.classList.add("done");
  }

  axios.put(todosUrl + "/" + this.getAttribute("data-id"),{completed: !completed})
    .then()
    .catch(handleErrors);
}

function createTodo(name){
  axios.post(todosUrl,{name: name})
    .then(parseJSON)
    .then(function(todo){
      todoList.appendChild(todoListItemHTML(todo));
    })
    .catch(handleErrors);
}


function parseJSON (res){
  console.log(res.data);
  return res.data;
}

function addTodo(todos){;
  todos.forEach(function(todo){
    console.log(todo.name);
    todoList.appendChild(todoListItemHTML(todo));
  });
}

function todoListItemHTML(todo){
  var deleteBtn = document.createElement('i');
  deleteBtn.setAttribute('class', 'fas fa-trash-alt');
  deleteBtn.addEventListener('click', deleteTodo, false);
  var li = document.createElement("li");
  li.addEventListener('click', toggleTodo, false);
  li.setAttribute('class', 'todo');
  li.setAttribute('data-id', todo._id);

  var alink = document.createElement('a');
  alink.innerHTML = todo.name;

  li.appendChild(alink)
  li.appendChild(deleteBtn);

  if(todo.completed){
    li.setAttribute('class', 'todo done');
  }

  return li;
}

function handleErrors(err) {
  if (err.response) {
    console.log("Problem With Response ", err.response.status);
  } else if (err.request) {
    console.log("Problem With Request!");
  } else {
    console.log('Error', err.message);
  }
}
