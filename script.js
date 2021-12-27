const container = document.querySelector('.container-todo');
const input = document.querySelector('.input-todo');
const plusBtn = document.querySelector('.btn-todo');

const todos = document.querySelectorAll('.todo');
const text = document.querySelectorAll('.text');
const btnCheck = document.querySelectorAll('.btn-done');
const btnDelete = document.querySelectorAll('.btn-delete');

plusBtn.addEventListener('click', () => {
  
  if(input.value !== ''){
    container.appendChild(makeTodo(input.value));
    recheck();
  }
  
});

function checking() {
  
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

function recheck(){
  const todos = document.querySelectorAll('.todo');
  const text = document.querySelectorAll('.text');
  const btnCheck = document.querySelectorAll('.btn-done');
  const btnDelete = document.querySelectorAll('.btn-delete');
  
  btnCheck.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const theText = e.target.parentElement.parentElement.querySelector('.text');
      theText.classList.toggle('underline');
      e.target.classList.toggle('change-color');
    });
  });

  btnDelete.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.target.parentElement.parentElement.remove();
    });
  });
  
  if(text.length >= 0){
    
    let todos = [];
    
    for(let i = 0; i < text.length; i++){
      todos.push(text[i].textContent);
    }
    
    console.log(todos);
    
    let json = `{${(function(){
      let jsonText = '';
      for(let i = 0; i < todos.length; i++){
        jsonText += `"todo${i}": "${todos[i]}",`;
      }
      return jsonText;
      
    })()}}`;
    
    
    json = json.replace('",}', '"}');
    localStorage.setItem('todo_storage', json);
    //return JSON.parse(json);
    
  }
  
}

/*function getRandHex(){
  const alphabets = 'ABCDEF';
  let hexCode = '#';
  
  for(let i = 0; i < 6; i++){
    
    let ToF;
    const random1 = Math.random();
    
    if(random1 < 0.5){
      ToF = true;
    }else{
      ToF = false;
    }
    
    if(!ToF){
      hexCode += alphabets[Math.floor(Math.random()*alphabets.length)]
    }else{
      hexCode += Math.floor(Math.random()*6);
    }
    
  }
  return hexCode;
}*/