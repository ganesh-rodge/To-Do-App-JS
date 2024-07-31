let addBtn  = document.querySelector("button");
let inputBox = document.querySelector("input");

let ul = document.querySelector("#list");


const addToList = () =>{
    if(inputBox.value === ""){
        return;
    }
    let li = document.createElement("li");
    li.innerText = inputBox.value;
    li.classList.add("listitem");
    console.log(li.innerText);
    ul.appendChild(li);
    inputBox.value = "";
    saveData();

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
}

addBtn.addEventListener("click", addToList);
inputBox.addEventListener("keyup", (event) =>{
    if(event.key==="Enter"){
        console.log("enter pressed");
        addToList();
    }
})

const clickList = () =>{
    listitem.classList.add("taskdone");
    console.log("Hello");
}



ul.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("taskdone");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false)

function saveData(){
    localStorage.setItem("data", ul.innerHTML);
    console.log("data saved");
}

function showTask(){
    ul.innerHTML = localStorage.getItem("data");
}
showTask();

