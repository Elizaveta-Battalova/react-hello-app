import { useState, useEffect } from 'react';
import './App.css';

const weekdays = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const dayHours = {
  morning: 'Утро',
  day: 'День',
  evening: 'Вечер',
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedDay, setSelectedDay] = useState('Понедельник');
  const [selectedHour, setSelectedHour] = useState('morning');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [loadedTasks, setLoadedTasks] = useState(false);

  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem('tasks'));
      const savedCompleted = JSON.parse(localStorage.getItem('completedTasks'));
      if (savedTasks) setTasks(savedTasks);
      if (savedCompleted) setCompletedTasks(savedCompleted);
    } catch (e) {
      console.error('Ошибка при загрузке', e);
    }
    setLoadedTasks(true);
  }, []);

  useEffect(() => {
    if (!loadedTasks) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks, loadedTasks]);

  const addTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;

    const task = {
      id: Date.now(),
      text: trimmed,
      week: selectedDay,
      hours: selectedHour,
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    setCompletedTasks((prev) => prev.filter((tid) => tid !== id));
  };

  const toggleTask = (id) => {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.text);
  };

  const saveEdit = () => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTaskId ? { ...task, text: editingTaskText } : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  return (
    <div className="main">
      <h1>Мои задачи</h1>

        <div className="task-bar">
        <input
            type="text"
            placeholder="Напишите задачу"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />

        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
            {weekdays.map((day) => (
            <option key={day} value={day}>{day}</option>
            ))}
        </select>

        <select value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
            {Object.entries(dayHours).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
            ))}
        </select>

        <button onClick={addTask} className="btn add-btn">Добавить</button>
        </div>



      {weekdays.map((day) => {
        const tasksForDay = tasks.filter(task => task.week === day);
        if (tasksForDay.length === 0) return null;

        return (
          <div key={day} className = 'card'>
            <h2>{day}</h2>
            {Object.entries(dayHours).map(([hourKey, hourLabel]) => {
              const tasksForHour = tasksForDay.filter(task => task.hours === hourKey);
              if (tasksForHour.length === 0) return null;

              return (
                <div key={hourKey}>
                  <h3>{hourLabel}</h3>
                  <ul>
                    {tasksForHour.map(task => (
                      <li key={task.id}>
                        {task.id === editingTaskId ? (
                          <>
                            <input
                              type="text"
                              value={editingTaskText}
                              onChange={(e) => setEditingTaskText(e.target.value)}
                            />
                            <button onClick={saveEdit} className="btn save-btn">Сохранить</button>
                            <button onClick={cancelEdit} className="btn cancel-btn">Отмена</button>
                          </>
                        ) : (
                          <>
                            <span
                              onClick={() => toggleTask(task.id)}
                              style={{
                                textDecoration: completedTasks.includes(task.id) ? 'line-through' : 'none',
                                cursor: 'pointer',
                              }}>
                              {task.text}
                            </span>
                            <button onClick={() => startEdit(task)} className="btn edit-btn">✏️</button>
                            <button onClick={() => deleteTask(task.id)} className="btn delete-btn">🗑️</button>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
