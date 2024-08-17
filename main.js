let todoForm = document.getElementById("todoForm");
let mytitle = document.getElementById("myTitle");
let mydesc = document.getElementById("myDesc");
let myCheckbox = document.getElementById("myCheckbox")
let displayCheckbox = document.getElementById('check-box')
let showTodo = document.getElementById("showTodo");
let mytaskId = new Date().getTime();
let myTasks = []


todoForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    validateForm();
    
})
let validateForm = () =>{
    if(mytitle.value === ''){
        Toastify({
    text: "Title Can Not be Blank",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#FF0000",
    },
    onClick: function(){} // Callback after click
  }).showToast();
    }
    else{
      Toastify({
    text: "Todo Added Successfully ",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#28a745",
    },
    onClick: function(){} // Callback after click
  }).showToast();
  postData();
    }
}
let postData = () =>{
  myTasks.push({
    title:mytitle.value,
    desc:mydesc.value,
    id:mytaskId,
    isCompleted:false
  });
  let db = localStorage.setItem('db', JSON.stringify(myTasks)); 
  mytitle.value = ''
  mydesc.value = ''
  location.reload()
}
let getData = () => {
  showTodo.innerHTML = ''; // Clear previous tasks
  myTasks.forEach((task, index) => {
    showTodo.innerHTML += `
      <div class='mytodos' id="${task.id}">
        <div class='title'>${task.title}</div>
        <div class='desc'>${task.desc}</div>
        <div class='isCompleted' onClick="isCompleted(this)">
          ${task.isCompleted ? 'Completed' : 'Not Completed Yet'}
        </div>
        <div class='action'>
          <i class='fa fa-trash delete-btn' aria-hidden='true' onClick="deleteTask(this)"></i>&nbsp;&nbsp;&nbsp;
          <i class='fa fa-pencil update-btn' aria-hidden='true' onClick="updateTask(this)"></i>
        </div>
      </div>
    `;
  });
}


const isCompleted = (e) => {
  // Identify the parent element of the clicked status
  let selectedItem = e.parentElement
  let taskId = selectedItem.id; // Get the ID of the task
  
  // Find the task in the myTasks array
  let task = myTasks.find(task => task.id == taskId);
  
  if (task) {
    // Toggle the isCompleted status
    task.isCompleted = !task.isCompleted;
    
    // Update the local storage
    localStorage.setItem('db', JSON.stringify(myTasks));
    
    // Refresh the display
    showTodo.innerHTML = ''; // Clear the current display
    getData(); // Re-populate the tasks
  }
}


let deleteTask = (e)=>{
  if(confirm("Do You Want To Delete Task")){
    console.log(e.parentElement.parentElement)
    let deletedTask = e.parentElement.parentElement.remove()
    myTasks.splice(deletedTask,1);
    localStorage.setItem('db', JSON.stringify(myTasks))
}
}
let updateTask = (e)=>{
  let selectedItem = e.parentElement.parentElement
  mydesc.value = selectedItem.children[1].innerText
  mytitle.value = selectedItem.children[0].innerText
  myTasks.splice(selectedItem,1)
  localStorage.setItem('db', JSON.stringify(myTasks));
  

}
(()=>{
  myTasks = JSON.parse(localStorage.getItem('db') ?? [{msg:'Nothing to show'}])
  getData();
  console.log(myTasks)  
})()








