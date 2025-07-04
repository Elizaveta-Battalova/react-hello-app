import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loadedTasks, setLoadedTasks] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    const savedCompletedTasks = JSON.parse(
      localStorage.getItem("completedTasks")
    );

    if (savedTasks) setTasks(savedTasks);
    if (savedCompletedTasks) setCompletedTasks(savedCompletedTasks);

    setLoadedTasks(true);
  }, []);

  useEffect(() => {
    if (loadedTasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, loadedTasks]);

  useEffect(() => {
    if (loadedTasks) {
      localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }
  }, [completedTasks, loadedTasks]);

  const addTask = () => {
    const trimmedTask = newTask.trim();

    if (trimmedTask === "") return;

    const task = {
      id: Date.now(),
      text: trimmedTask,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.text);
  };

  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editingTaskText } : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  const toggleCompletedTask = (completedId) => {
    setCompletedTasks((current) =>
      current.includes(completedId)
        ? current.filter((id) => id !== completedId)
        : [...current, completedId]
    );
  };

  const deleteTask = (idToDelete) => {
    setTasks(tasks.filter((task) => task.id !== idToDelete));
  };

  return (
    <div>
      <h1>Список задач</h1>
      <div className="input-wrapper">
       <input
        type="text"
        placeholder="Напишите задачу"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />
      <button type="button" onClick={addTask} style={{ backgroundColor: "green", color: "white" }}>
         ✓
      </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key = {task.id}
          className = {completedTasks.includes(task.id) ? 'completed' : ''}>
            {task.id === editingTaskId ? (<>
            <input type = 'text'
            value = {editingTaskText}
            onChange = {(e) => setEditingTaskText(e.target.value)}/>
            <button type="button" onClick = {saveEdit} style={{ backgroundColor: "green", color: "white" }}>Сохранить</button>
            <button type="button" onClick = {cancelEdit} style={{ backgroundColor: "gray", color: "white" }}>Отмена</button></>) : (<>
            <span onClick = {() => toggleCompletedTask(task.id)}
              style = {{textDecoration: completedTasks.includes(task.id) ? 'line-through' : 'none', cursor: 'pointer'}}>{task.text}</span>
              <button type="button" onClick = {() => startEdit(task)} style={{ backgroundColor: "orange", color: "white" }}>Редактировать</button></>)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
