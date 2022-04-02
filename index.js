let adderButton = document.querySelector(".todo-button");
let ul = document.querySelector(".todo-list")
let options = document.querySelectorAll(".filter-todo option");
let input = document.querySelector(".todo-input");
let FilterTodo = document.querySelector(".filter-todo");


adderButton.addEventListener("click" , addTasks);
ul.addEventListener("click" , deleteOrComplate);
FilterTodo.addEventListener("click" , ShowAllOrFilltred);
document.addEventListener("DOMContentLoaded" , saveAllfromLocal)


function addTasks(e){   
    let div = document.createElement("div");
    div.classList.add("todo");
    
    let LI = document.createElement("li");
    LI.classList.add("todo-item");
    LI.innerText = input.value;
    div.appendChild(LI);
    saveToLocalStorage(input.value);
    
    
    let comPlate = document.createElement("button");
    comPlate.setAttribute("href" , "#");
    comPlate.innerHTML = `<i class="fas fa-check"></i>`;
    comPlate.classList.add("complete-btn");
    div.appendChild(comPlate);

            
    let trash = document.createElement("button")
    trash.innerHTML = `<i class="fas fa-trash"></i>`
    trash.classList.add("trash-btn");
    div.appendChild(trash);
        
    ul.appendChild(div);
        
    input.value = "";
    e.preventDefault();
}

function deleteOrComplate(e) {
    const target = e.target;
    if(target.classList[0] === "trash-btn"){
        let targrtParent = target.parentElement;
        targrtParent.remove();
        deletFromLocal(targrtParent);
    }
    if(target.classList[0] === "complete-btn"){
        let targrtParent = target.parentElement;
        targrtParent.classList.toggle("completed");
    }
}

function ShowAllOrFilltred(event){
    let getLists = ul.childNodes;
    getLists.forEach(items => {
        switch(event.target.value){
            case "all":
                items.style.display = "flex";
                break;
            case "completed":
                if(items.classList.contains("completed")) {
                    items.style.display = "flex";
                }else {
                    items.style.display = "none";
                }    
                break;
            case "uncompleted":
                if(items.classList.contains("completed")) {
                    items.style.display = "none";
                }else {
                    items.style.display = "flex";
                }   
                break;
        }
    });
}


function saveToLocalStorage(item){
    let items;
    if(localStorage.getItem("items") === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem("items"));
    }
    items.push(item);
    localStorage.setItem("items" , JSON.stringify(items));
}

function deletFromLocal(e) {
    let nullArray;
    if(localStorage.getItem("items") === null){
        nullArray = [];
    }else {
        nullArray = JSON.parse(localStorage.getItem("items"));
    }
    const eventIndex = e.children[0].innerText;
    nullArray.splice(nullArray.indexOf(eventIndex) , 1);
    localStorage.setItem("items" , JSON.stringify(nullArray));
}


function saveAllfromLocal(){
    let nullArray;
    if(localStorage.getItem("items") === null){
        nullArray = [];
    }else {
        nullArray = JSON.parse(localStorage.getItem("items"));
    }
    nullArray.forEach(elements =>{
    let div = document.createElement("div");
    div.classList.add("todo");
    
    let LI = document.createElement("li");
    LI.classList.add("todo-item");
    LI.innerText = elements;
    div.appendChild(LI);
    
    
    let comPlate = document.createElement("button");
    comPlate.setAttribute("href" , "#");
    comPlate.innerHTML = `<i class="fas fa-check"></i>`;
    comPlate.classList.add("complete-btn");
    div.appendChild(comPlate);

            
    let trash = document.createElement("button")
    trash.innerHTML = `<i class="fas fa-trash"></i>`
    trash.classList.add("trash-btn");
    div.appendChild(trash);
        
    ul.appendChild(div);
      
    });
}






