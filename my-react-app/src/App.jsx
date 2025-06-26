import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [completedIds, setCompletedIds] = useState([]);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    const storedCompleted = JSON.parse(localStorage.getItem("completedTasks"));

    if (storedTasks) setTaskList(storedTasks);
    if (storedCompleted) setCompletedIds(storedCompleted);

    setHasLoadedFromStorage(true);
  }, []);

  useEffect(() => {
    if (hasLoadedFromStorage) {
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }
  }, [taskList, hasLoadedFromStorage]);

  useEffect(() => {
    if (hasLoadedFromStorage) {
      localStorage.setItem("completedTasks", JSON.stringify(completedIds));
    }
  }, [completedIds, hasLoadedFromStorage]);

  const addTask = () => {
    if (taskInput.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
    };

    setTaskList([...taskList, newTask]);
    setTaskInput("");
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
    setCompletedIds(completedIds.filter((completedId) => completedId !== id));
  };

  const toggleTask = (id) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h1>To Do List</h1>

      <input
        type="text"
        placeholder="Type your task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {taskList.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                textDecoration: completedIds.includes(task.id)
                  ? "line-through"
                  : "none",
                cursor: "pointer",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
