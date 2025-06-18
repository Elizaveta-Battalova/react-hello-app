import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState('');

const addTask = () => {
  if(newTask.trim() !== '') {
    setTasks([...tasks, newTask.trim()]);
    setNewTask('');
  }
};

const deleteTask = (indexToDelete) => {
  setTasks(tasks.filter((_, index) => (index !== indexToDelete)));
};

return(
  <div>
    <h1>to do list</h1>
    <input type = 'text' placeholder = 'add task' value = {newTask} onChange = {(e) => setNewTask(e.target.value)}></input>
    <button onClick = {addTask}>add</button>
    <ul>
          {tasks.map((task, index) => (
      <li key = {index}>{task} <button onClick = {() => {deleteTask(index)}}>delete</button></li>
    ))}
    </ul>
  </div>
)
}
export default App