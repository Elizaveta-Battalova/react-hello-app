import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = () => {
    if(newTask.trim() !== '') {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
      }
     setTasks([...tasks, task]);
     setNewTask('');
    }
  }

  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter(task => task.id !== indexToDelete));
    setCompletedTasks(completedTasks.filter(id => id !== indexToDelete));
  }

  const toggleTasks = (toggleIndex) => {
    setCompletedTasks((prev) => prev.includes(toggleIndex) ? prev.filter((i) => i !== toggleIndex) : [...prev, toggleIndex]);
  }

  return(
    <div>
      <h1>to do list</h1>
      <input type = 'text'
      placeholder = 'type your task'
      value = {newTask}
      onChange = {(e) => setNewTask(e.target.value)}
      onKeyDown = {(e) => {
        if(e.key === 'Enter') {
          addTask()
        }
      }}></input>
      <button onClick = {addTask}>add task</button>

      <ul>
        {tasks.map((task) => (
          <li key = {task.id}>
            <span onClick = {() => toggleTasks(task.id)} style = {{textDecoration: completedTasks.includes(task.id) ? 'line-through' : 'none'}}>{task.text}</span>
            <button onClick = {() => deleteTask(task.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
