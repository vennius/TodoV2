const container = document.querySelector('.container-todo');
const input = document.querySelector('.input-todo');
const plusBtn = document.querySelector('.btn-todo');

let todos = document.querySelectorAll('.todo');
let text = document.querySelectorAll('.text');
let btnCheck = document.querySelectorAll('.btn-done');
let btnDelete = document.querySelectorAll('.btn-delete');

load();



plusBtn.addEventListener('click', () => {
  
  if(input.value !== ''){
    container.appendChild(makeTodo(input.value));
    reselect();
    recheck();
    save();
  }
  
});

function load() {
  if(localStorage.getItem('todo_storage')){
    const parsed = JSON.parse(localStorage.getItem('todo_storage'));
    for(const i in parsed){
      const newTodo = makeTodo(parsed[i].content);
      container.appendChild(newTodo);
      if(parsed[i].isDone){
        newTodo.querySelector('.text').classList.add('underline');
      }
    }
    recheck();
  }
}

function makeTodo(text){
  
  const newTodo = document.createElement('div');
  const newText = document.createElement('span');
  const newPlace = document.createElement('div');
  const newDone = document.createElement('div');
  const newDelete = document.createElement('div');
  
  newTodo.classList.add('todo');
  newText.classList.add('text');
  newText.textContent = text;
  newPlace.classList.add('btn-place');
  newDone.classList.add('btn-done');
  newDelete.classList.add('btn-delete');
  newPlace.appendChild(newDone);
  newPlace.appendChild(newDelete);
  
  newTodo.appendChild(newText);
  newTodo.appendChild(newPlace);
  return newTodo;
  
}


function save(){
  let strg = {};
  todos.forEach((el, i) => {
    const content = el.querySelector('.text').textContent;
    strg[`todo${i}`] = {};
    strg[`todo${i}`].content = content;
    strg[`todo${i}`].isDone = (el.querySelector('.text').classList.contains('underline')) ? true:false;
  });
  //console.log(strg);
  localStorage.setItem('todo_storage', JSON.stringify(strg));
}

function reselect(){
  todos = document.querySelectorAll('.todo');
  text = document.querySelectorAll('.text');
  btnCheck = document.querySelectorAll('.btn-done');
  btnDelete = document.querySelectorAll('.btn-delete');
}


function recheck(){
  reselect();
  
  btnCheck.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const theText = e.target.parentElement.parentElement.querySelector('.text');
      theText.classList.toggle('underline');
      //e.target.classList.toggle('change-color');
      reselect();
      save();
    });
  });

  btnDelete.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.target.parentElement.parentElement.remove();
      reselect();
      save();
    });
  });
  
  //save();
  
}
