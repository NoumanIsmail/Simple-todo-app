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
      
      <div class='title'><span>Title : </span> ${task.title}</div>
      <div class='desc'><span>Description : </span> ${task.desc}</div>
      <div class='isCompleted'><span>Status : </span>${task.isCompleted ? 'Completed':'Not Completed Yet'}</div>
      <div class='action'>
      <span>Actions : </span><i class='fa fa-trash' aria-hidden='true'></i><br>
      <span>Actions : </span><i class='fa fa-pencil' aria-hidden='true'></i>
    </div>
    </div>
    `
    )
  });
}

  myTasks = JSON.parse(localStorage.getItem('db') ?? [])
  getData();
  console.log(myTasks)  








