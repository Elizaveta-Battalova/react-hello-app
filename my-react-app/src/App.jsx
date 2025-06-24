import { useState } from 'react';
import './App.css';

function App() {
 const [tasks, setTasks] = useState([]);
 const [newTask, setNewTask] = useState('');
 const [completedTasks, setCompletedTasks] = useState([]);

 const addTask = () => {
  if (newTask.trim() !== '') {
    setTasks([...tasks, newTask.trim()]);
    setNewTask('');
  }
 };

 const deleteTask = (indexToDelete) => {
  setTasks(tasks.filter((_, index) => index !== indexToDelete));
  setCompletedTasks(completedTasks.filter((_, index) => index !== indexToDelete));
 };

 const toggleCompleted = (completedIndex) => {
  setCompletedTasks((prev) => prev.includes(completedIndex) ? prev.filter((i) => i !== completedIndex) : [...prev, completedIndex]);
 };

 return(
  <div>
    <h1>To do list</h1>
    <input type = 'text'
    placeholder = 'type your task'
    value = {newTask}
    onChange = {(e) => setNewTask(e.target.value)}></input>
    <button onClick = {addTask}>add</button>

    {tasks.map((task, index) => (
      <li key = {index}>
        <span onClick = {() => toggleCompleted(index)}
        style = {{textDecoration: completedTasks.includes(index) ? 'line-through' : 'none'}}>{task}</span>
        <button onClick = {() => deleteTask(index)}>delete</button>
      </li>
    ))}
  </div>
 )
}

export default App;
