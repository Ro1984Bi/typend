import "./style.css";
import {v4} from 'uuid'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const taskForm = document.querySelector<HTMLFormElement>("#taskForm");
const tasksList = document.querySelector<HTMLDivElement>("#tasksList");

interface Task {
  id: string;
  title: string;
  description: string;
}

let tasks: Task[] = [];

taskForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["title"] as unknown as HTMLInputElement;
  const description = taskForm["description"] as unknown as HTMLTextAreaElement;

  tasks.push({
    title: title.value,
    description: description.value,
    id: v4()
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  Toastify({
    text: "Task added"
  }).showToast()

  renderTasks(tasks)

  taskForm.reset();
  taskForm.focus();
});

document.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  renderTasks(tasks);
});
const renderTasks = (tasks: Task[]) => {

  tasksList!.innerHTML = ''
  
  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className =
      "bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-700 hover:cursor-pointer";
    const header = document.createElement("header");
    header.className = 'flex justify-between'

    const content = document.createElement("span");
    content.innerText = task.title;

    const btnDelete = document.createElement("button");
    btnDelete.className = 'bg-red-500 px-2 py-1 rounded-md'
    btnDelete.innerText = 'Delete';
    header.append(content)
    header.append(btnDelete)


    btnDelete.addEventListener('click', () => {
      const index = tasks.findIndex(t => t.id === task.id);
      tasks.splice(index, 1)
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks(tasks)
    })
    const description = document.createElement('p')
    description.innerText = task.description;
  

    taskElement.append(header);
    taskElement.append(description);
    tasksList?.append(taskElement);
  });
};
