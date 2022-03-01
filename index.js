const taskContainer = document.querySelector(".task");
let globalTaskData = [];

const generateHTML = (taskData) => {
  return `<div id=${taskData.id} class="col-4">
    <div id="card" class="card">
      <div class="card-header d-flex justify-content-end gap-2">
        <button class="edit" name=${taskData.id} data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editCard.apply(this, arguments)" type="button" name="button"><i class="fa name=${taskData.id} fa-pencil" aria-hidden="true"></i></button>
        <button class="edit" name=${taskData.id} onclick="deleteCard.apply(this, arguments)" type="button" name="button"><i class="fa name=${taskData.id} fa-trash-o" aria-hidden="true"></i></button>
      </div>
      <div class="card-body">
        <img class="img" src=${taskData.image} alt="">
        <h5 id="card-title" class="card-title mt-4">${taskData.title}</h5>
        <p id="card-text" class="card-text">${taskData.description}</p>
        <a href="#" class="Add">${taskData.type}</a>
      </div>
    </div>
  </div>`
};

let saveToLocalStorage = () => {
  localStorage.setItem("taskyProject", JSON.stringify({card: globalTaskData}));
}

let insertToDOM = (content) => {
  taskContainer.insertAdjacentHTML("beforeend", content);
}

const addNewCard = () => {
  let taskData = {
    id:  `${Date.now()}`,
    title: document.getElementById('taskTitle').value,
    image: document.getElementById('ImageURL').value,
    type: document.getElementById('taskType').value,
    description: document.getElementById('taskDescription').value
  };

  globalTaskData.push(taskData);
  saveToLocalStorage();

  let newCard = generateHTML(taskData);
  insertToDOM(newCard);

  document.getElementById('taskTitle').value="";
  document.getElementById('taskType').value="";
  document.getElementById('ImageURL').value="";
  document.getElementById('taskDescription').value="";

  return;
}

const loadExistingCards = () => {
  let getData = localStorage.getItem("taskyProject");

  if(!getData) return;

  let taskCards = JSON.parse(getData);

  globalTaskData = taskCards.card;
  globalTaskData.map((taskData) => {
    let newCard = generateHTML(taskData);
    insertToDOM(newCard);
  });

  return;
}

const deleteCard = (event) => {
  let targetID = event.target.getAttribute("name");
  let elementType = event.target.tagName;

  let removeTask = globalTaskData.filter((task)=> task.id !== targetID);
  globalTaskData = removeTask;

  saveToLocalStorage();

  if(elementType === "BUTTON")
  {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  } else {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode
    );
  }
};

const editCard = (event) => {
  deleteCard(event);
  saveToLocalStorage();
}
