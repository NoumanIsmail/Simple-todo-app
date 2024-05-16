let todoForm = document.getElementById("todoForm");
let mytitle = document.getElementById("myTitle");
let mydesc = document.getElementById("myDesc");
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
let getData = () =>{
  myTasks.map((task,index)=>{
    return( 
      showTodo.innerHTML += `
      <div class='mytodos'>
      
      <div class='title'> ${task.title}</div>
      <div class='desc'> ${task.desc}</div>
      <div class='isCompleted'>${task.isCompleted ? 'Completed':'Not Completed Yet'}</div>
      <div class='action'>
      <i class='fa fa-trash delete-btn' aria-hidden='true' onClick="deleteTask(this)" ></i>&nbsp;&nbsp;&nbsp;
      <i class='fa fa-pencil update-btn' aria-hidden='true' onClick="updateTask(this)" ></i>
    </div>
    </div>
    `
    )
  });
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








