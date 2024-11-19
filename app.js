const add = document.querySelector("#add-btn"); 
const taskDiv = document.querySelector(".task-div");

// Function to save tasks to local storage
const saveToLocalStorage = () => {
    const tasks = [...taskDiv.querySelectorAll(".display-ele span")].map(task => ({
        text: task.textContent,
        completed: task.classList.contains("overline")
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Function to load tasks from local storage
const loadFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const listElement = createListElement(task.text);
        if (task.completed) {
            listElement.querySelector("span").classList.add("overline");
        }
        taskDiv.appendChild(listElement);
    });
};

// Create list element
const createListElement = (value) => {
    const listElement = document.createElement('div');
    listElement.classList.add('display-ele');
    listElement.innerHTML = `
        <div class="task-checkbox">
            <img src="resources/checkbox.png" alt="" class="checkbox">
            <span>${value}</span>
        </div>
        <img src="resources/delete.png" alt="" class="remove-btn"></img>`;
    return listElement;
};

// Add button click event
add.addEventListener("click", (evt) => {
    evt.preventDefault();
    const input = document.querySelector("#input-box");
    const inputValue = input.value.trim();
    let listElement;
    if (inputValue !== '') {
        listElement = createListElement(inputValue);
        taskDiv.appendChild(listElement);
        saveToLocalStorage(); // Save to local storage
    }
    input.value = '';
});

// Task div click event
taskDiv.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('checkbox')) {
        evt.target.nextElementSibling.classList.toggle('overline');
        saveToLocalStorage(); // Save updated tasks
    } else if (evt.target.classList.contains('remove-btn')) {
        evt.target.parentElement.remove();
        saveToLocalStorage(); // Save updated tasks
    }
});

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadFromLocalStorage);
