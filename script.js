const txt = document.getElementById('txt')
const ul = document.getElementById('my-ul');
const date = document.getElementById('date');
let tasks = JSON.parse(localStorage.getItem('tasks')) || []; //cover it from string to array
//add todo task function
function add() {
  if (txt.value == '' || date.value == '') {
    alert("please input task and deadline!!!")
  } else {
    const currentTime = new Date();
    console.log(currentTime);
    saveToLocalstorage(txt.value, date.value);
    displayTask(tasks[tasks.length-1]) //display tasks of lastest element of array
    txt.value = '';
    date.value = '';
  }
}

function saveToLocalstorage(task, deadline) {
  // let tasks = JSON.parse(localStorage.getItem('tasks')) || []; //cover it from string to array
  tasks.push({task:task, deadline: deadline}) //push is array method for and new element to the last index of array
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTask(tasks) {
  const li = document.createElement("li");
  // li.textContent = element;

  const span = document.createElement("span");
  span.innerHTML = `${tasks.task} (Deadline: ${tasks.deadline})`;
  //create a delete button
  let btn = document.createElement("button");
  btn.innerHTML = "delete"

  li.appendChild(span);
  li.appendChild(btn);
  ul.appendChild(li);

  btn.onclick = function () {
    remove(li)
  }

  li.onclick = () => {
    span.style.textDecoration = span.style.textDecoration === "line-through" ? "none" : "line-through";
  }
}

function getFromLocalstorage() {
  // let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(element => {
    displayTask(element)
  });
}

function remove(li) {
  // const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (confirm("Are you sure you want to remove this item?")) {
    let ul = li.parentNode;
    let index = Array.from(ul.children).indexOf(li);
    ul.removeChild(li);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

function updateDeadline(deadline, currentTime){

}

getFromLocalstorage();