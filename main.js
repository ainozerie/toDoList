'use strict';
let taskNumber = 1000;
const removeTask = () => {
    document.querySelectorAll('.taskDelete').forEach(elem => {
        elem.addEventListener('click', event => {
            let currentText = event.currentTarget.parentNode.querySelector('p').textContent;
            event.currentTarget.parentNode.remove();
            taskNumber = 1000;
            while (localStorage.getItem(taskNumber) !== null) {
                if (localStorage.getItem(taskNumber) == currentText) {
                    localStorage.removeItem(taskNumber);
                    while (localStorage.getItem(taskNumber + 1) !== null) {
                        localStorage.setItem(taskNumber, localStorage.getItem(taskNumber + 1));
                        taskNumber++;
                    }
                    localStorage.removeItem(taskNumber);
                    break;
                }
                taskNumber++;
            }
        })
    });
}
const completeTask = () => {
    document.querySelectorAll('.taskComplete').forEach(elem => {
        elem.addEventListener('click', event => {
            if (!event.currentTarget.parentNode.classList.contains('inactive')) {
                let currentNode = event.currentTarget.parentNode;
                event.currentTarget.parentNode.remove();
                currentNode.classList.add('inactive');
                currentNode.querySelector('.active').classList.remove('active');
                document.querySelector('.newTask').appendChild(currentNode);  
            }
            let currentText = event.currentTarget.parentNode.querySelector('p').textContent;
            taskNumber = 1000;
            while (localStorage.getItem(taskNumber) !== null) {
                if (localStorage.getItem(taskNumber) == currentText) {
                    localStorage.removeItem(taskNumber);
                    while (localStorage.getItem(taskNumber + 1) !== null) {
                        localStorage.setItem(taskNumber, localStorage.getItem(taskNumber + 1));
                        taskNumber++;
                    }
                    localStorage.removeItem(taskNumber);
                    break;
                }
                taskNumber++;
            }
        })
    })
}
const getNewTask = (text) => {
    let divTask = document.createElement('div');
    divTask.classList.add('task');

    let divTaskText = document.createElement('div');
    divTaskText.classList.add('taskText');

    let p = document.createElement('p');
    p.textContent = text.slice(0, 30);

    let divTaskComplete = document.createElement('div');
    divTaskComplete.classList.add('taskComplete');

    let imgCheck = document.createElement('img');
    imgCheck.setAttribute('src', 'check.svg');
    imgCheck.classList.add('active');

    let divTaskDelete = document.createElement('div');
    divTaskDelete.classList.add('taskDelete');

    let imgDelete = document.createElement('img');
    imgDelete.setAttribute('src', 'cross.svg')

    divTask.appendChild(divTaskText);
    divTask.appendChild(divTaskComplete);
    divTask.appendChild(divTaskDelete);
    divTaskText.appendChild(p);
    divTaskComplete.appendChild(imgCheck);
    divTaskDelete.appendChild(imgDelete);

    return divTask;
}

// loading data from localStorage
if (localStorage.getItem(taskNumber) !== null) {
    while (localStorage.getItem(taskNumber) !== null) {
        document.querySelector('.tasks').appendChild(getNewTask(localStorage.getItem(taskNumber)));
        taskNumber++;
    }
} else {
    document.querySelector('.tasks').appendChild(getNewTask('Call Mr. Jhonson'));
    document.querySelector('.tasks').appendChild(getNewTask('Buy milk'));
}

completeTask();
removeTask(); // launch event listener for existing tasks
// create a function to remove button so all tasks are under event-listener even after creating new tasks

// add new task after click on button 'add'
document.querySelector('button').addEventListener('click', () => {
    let text = document.querySelector('input').value.toLowerCase();
    text = text.slice(0, 1).toUpperCase() + text.slice(1);

    console.log(text);
    if (text !== '') {
        document.querySelector('.tasks').appendChild(getNewTask(text));
        document.querySelector('input').value = '';
        removeTask();
        completeTask();
        taskNumber = 1000;
        while (localStorage.getItem(taskNumber) !== null) {
            taskNumber++;
        }
        localStorage.setItem(taskNumber, text);
    }
})

// creates a node including all needed elements and its classes and text of the task