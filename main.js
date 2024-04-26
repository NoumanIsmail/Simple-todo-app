const todoForm = document.getElementById("todoForm");
let mytitle = document.getElementById("myTitle");
let mydesc = document.getElementById("myDesc");
let showTodo = document.getElementById("showTodo");
const mytaskId = new Date().getTime();

const myTasks = []

todoForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    validateForm();
    
})
const validateForm = () =>{
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
const db = localStorage.setItem('db', JSON.stringify(myTasks)); 
const postData = () =>{
  myTasks.push({
    title:mytitle.value,
    desc:mydesc.value,
    id:mytaskId,
    isCompleted:false
  });
  getData();
}
const getData = () =>{
  showTodo = '';
  db.map((task,index)=>{
    return( 
    showTodo.innerHTML += `
    <td>${index}</td>
    <td>${task.title}</td>
    <td>${task.desc}</td>
    <td>${task.isCompleted}</td>
    <td>${index}</td>
    `
    )
  });
  db = JSON.parse(localStorage.getItem('db'))
  console.log(db)
  
}







