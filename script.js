const txt = document.getElementById('txt')
const ul = document.getElementById('my-ul');
const date = document.getElementById('date');
let tasks = JSON.parse(localStorage.getItem('tasks')) || []; //cover it from string to array

//add todo task function
function add() {
  if (txt.value == '' || date.value == '') {
    alert("please input task and deadline!!!")
  } else {
    saveToLocalstorage(txt.value, date.value);
    displayTask(tasks[tasks.length - 1]) //display tasks of lastest element of array
    console.log(date.value);
    txt.value = '';
    date.value = '';
  }
}

function saveToLocalstorage(task, deadline) {
  tasks.push({ task: task, deadline: deadline }) //push is array method for and new element to the last index of array
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTask(tasks) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = `${tasks.task}`;
  const countdownSpan = document.createElement("span");
  countdownSpan.classList.add("countdown")
  updateDeadline(tasks.deadline, countdownSpan);

  //create a delete button
  let btn = document.createElement("button");
  btn.innerHTML = "delete"

  li.appendChild(span);
  li.appendChild(countdownSpan);
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

function updateDeadline(deadline, countdownSpan) {
  const deadlineDate = new Date(deadline).getTime();

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = deadlineDate - now

    //calculate time left in days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      clearInterval(interval);
      countdownSpan.innerHTML = "( Expired )";
      countdownSpan.style.color = "red";
    } else {
      countdownSpan.innerHTML = `( Time left: ${days}d ${hours}h ${minutes}m ${seconds}s )`;
    }
  }, 1000);
}

getFromLocalstorage();