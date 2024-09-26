const txt = document.getElementById('txt')

function add() {
  if (txt.value === '') {
    alert("Input something please!")
  } else {
    const ul = document.getElementById('my-ul');
    const li = document.createElement("li");
    li.textContent = txt.value;
    ul.appendChild(li)

    const items = [...ul.getElementsByTagName('li')].map(li => li.textContent);
    localStorage.setItem('data', JSON.stringify(items));
  }
  txt.value = '';
}

window.onload = function () {
  const storeItems = JSON.parse(localStorage.getItem('data')) || [];
  const ul = document.getElementById('my-ul');
  storeItems.forEach(element => {
    const li = document.createElement("li");
    li.textContent = element;
    ul.appendChild(li)
    li.addEventListener('click', function(){
      li.style.textDecoration = li.style.textDecoration === 'line-through' ? 'none' : 'line-through';
      li.style.backgroundColor = li.style.backgroundColor === 'rgb(164, 164, 164)' ? '' : '#a4a4a4';
    })
  });
}


