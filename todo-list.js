const addBtn = document.getElementById('add-btn');
const inputTask = document.getElementById('input-task');


addBtn.addEventListener('click',addTask)

let myTasks = [];

function addTask(){
    let yourTask = inputTask.value;

    if(yourTask.length==0){
        alert('введите нормальный таск')
        return
    }

    let taskId = Math.floor(Math.random() * 100);
    
    let task = {
        taskTitle:yourTask,
        isImportant: false,
        isCompleted:false,
        taskId:taskId
    }

    myTasks.push(task);

    inputTask.value = '';

    taskRender(task);
    
}


function taskRender(taskObj){
  
    let taskElement = document.createElement('li');
    
    //вот это пушка
    taskElement.classList.add('list-group-item', 'd-flex','justify-content-between','align-items-center')

    taskElement.id = taskObj.taskId;
    const myTasks = document.getElementById('my-tasks');
    
    taskElement.innerHTML = `
        <div>
            <input type="checkbox" class="hiding-stuff" onchange="completedTask(this)">
            <span class="ml-3 custom-font">
                ${taskObj.taskTitle}
            </span>
        </div>
        <div>
            <i onclick="highLight(this)" class="far fa-star mr-3"></i>
            <i onclick="removeTask(this)" class="fas fa-trash-alt ml-3 mr-3 hiding-stuff"></i>
        </div>
    `;

    


    updateUI();
 

    //добавляем в массив с заданиями
    myTasks.append(taskElement);
}



function completedTask(thisItem){
    let checkedTaskId = thisItem.parentNode.parentNode.id;
    console.log(checkedTaskId);

    for(task of myTasks){
        if(task.taskId == checkedTaskId){
            task.isCompleted = true;
        }
    }
    console.log(myTasks)

    thisItem.style.display="none";
    thisItem.nextElementSibling.style.textDecoration = 'line-through';
    thisItem.nextElementSibling.style.fontStyle = 'italic'
    thisItem.nextElementSibling.style.color = 'red'

}

function removeTask(task){
    let checkedTaskId = task.parentNode.parentNode.id;
    console.log(checkedTaskId);
    console.log(myTasks);

    for(task of myTasks){
        if(task.taskId == checkedTaskId){
            if(task.isCompleted == false){
                alert('это задание еще не закончено')
                return;
            }
        }
    }


    let taskIndexArray = myTasks.map(task => task.taskId)
    //console.log(taskIndexArray)
    let neededIndex = taskIndexArray.indexOf(+checkedTaskId)
    console.log(neededIndex);


    myTasks.splice(neededIndex,1)
    //удаляем из страницы, но не из массива
    const taskList = document.getElementById('my-tasks');
    taskList.children[neededIndex+1].remove();
    updateUI();
}
 
function updateUI(){
    let textSection = document.getElementById('entry-text');
    myTasks.length == 0 ? textSection.style.display = 'block' : textSection.style.display = 'none' 
}

function highLight(task){
    let highLight = task.parentNode.parentNode;
    console.log(highLight);
    highLight.classList.add('bg-warning')

    //console.log(myTasks);
}



//нашел в интернете как приделать функцию считывания на клавишу enter
if (inputTask.addEventListener)
inputTask.addEventListener("keypress", function(e) {
        if (e.keyCode === 13) {
            addTask()
            e.preventDefault();
        }
    }, false);












