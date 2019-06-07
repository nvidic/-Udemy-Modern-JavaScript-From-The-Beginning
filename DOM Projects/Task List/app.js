// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// umesto globalnog opsega
// load all event listeners
loadEventListeners();

// Load all event listenesr
function loadEventListeners(){
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

    // Filter through tasks
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Kreiram DOM elemente
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

    });

}

// Add task
function addTask(e){
    // ako nista nije uneto
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // dodajem Local Storage da se taskovi ne bi brisali 
    // Local Storage se moze videti u Inspect -> Application -> Local Storage
    // Local Storage je podrzan u okviru JS
    // Store in Local Storage - naknadno dodato
    storeTaskInLocalStorage(taskInput.value);

    // Clear input 
    taskInput.value = '';

    console.log(li);

    e.preventDefault(); // default behaviour je form submit - a to hocemo da izbegnemo
}

  
// Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    // proveri da li u Local Storage vec postoji niz tasks
    // ako ne postoji, postavi promenljivu da bude prazan niz
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        // local storage moze da sadrzi SAMO stringove!
        // mora da se parsira
        // string parsiram u JSON
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // dodajem novi task
    tasks.push(task);

    // azuriram Local Storage 
    // tasks mora da se pretvori u string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e){
    // e.target je x ikonica
    // njen roditelj je link
    if(e.target.parentElement.classList.contains('delete-item')){
        console.log(e.target);
        // roditelj roditelja je li element koji ceo treba da se obrise
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            // treba obrisati task i iz Local Storage
            // ono sto brisem je zapravo ceo <li> element
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem){   
    console.log(taskItem);

    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // trazim da li task (taskItem.textContent) postoji u LS
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Clear Tasks
function clearTasks(){
    // nacin 1
    // taskList.innerHTML = '';

    // nacin 2 - brze
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    clearTasksFromLocalStorage();

}

// Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    //console.log(text);

    // dobijemo nodeList pa je moguc forEach
    // da je koriscen getElementByClass to vraca html kolekciju koja mora da se pretvara u Array
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }
            else{
                task.style.display = 'none';
            }
        }
    );

}
