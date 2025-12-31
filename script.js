const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = updateUI;

function addTask(){
  if(taskInput.value === "") return alert("Write something!");

  tasks.push({
    text: taskInput.value,
    completed: false
  });

  taskInput.value = "";
  save();
}

function toggleTask(index){
  tasks[index].completed = !tasks[index].completed;
  save();
}

function editTask(index){
  let newTask = prompt("Edit task:", tasks[index].text);
  if(newTask !== null && newTask !== ""){
    tasks[index].text = newTask;
    save();
  }
}

function deleteTask(index){
  tasks.splice(index,1);
  save();
}

function clearAll(){
  if(confirm("Clear all tasks?")){
    tasks = [];
    save();
  }
}

function save(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateUI();
}

function updateUI(){
  taskList.innerHTML = "";

  let completed = 0;

  tasks.forEach((task,index)=>{
    if(task.completed) completed++;

    taskList.innerHTML += `
      <li class="${task.completed ? "completed":""}">
        <span onclick="toggleTask(${index})">${task.text}</span>
        <div class="actions">
          <button onclick="editTask(${index})">✏️</button>
          <button onclick="deleteTask(${index})">🗑</button>
        </div>
      </li>
    `;
  });

  document.getElementById("total").innerText = "Total: " + tasks.length;
  document.getElementById("completed").innerText = "Completed: " + completed;
  document.getElementById("pending").innerText = "Pending: " + (tasks.length - completed);
}

