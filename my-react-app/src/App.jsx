import { useState, useEffect } from "react";
import "./App.css";

function App() {
const [meals, setMeals] = useState([]);
const [newMeal, setNewMeal] = useState('');
const [eatenMeals, setEatenMeals] = useState([]);
const [editingMealId, setEditingMealId] = useState(null);
const [editingMealText, setEditingMealText] = useState('');
const [loadedMeals, setLoadedMeals] = useState(false);
const [selectedCategory, setSelectedCategory] = useState('breakfast');

useEffect(() => {
  try{
    const savedMeals = JSON.parse(localStorage.getItem('meals'));
    const savedEatenMeals = JSON.parse(localStorage.getItem('eatenMeals'));

    if(savedMeals) setMeals(savedMeals);
    if(savedEatenMeals) setEatenMeals(savedEatenMeals);
  } catch (e) {
    console.error('ошибка парсинга localstorage', e)}
    setLoadedMeals(true);
}, []);

useEffect(() => {
  if(loadedMeals) {
    localStorage.setItem('meals', JSON.stringify(meals));
    localStorage.setItem('eatenMeals', JSON.stringify(eatenMeals));
  }
}, [meals,eatenMeals,loadedMeals]);

const addMeal = () => {
  const trimmedMeal = newMeal.trim();
  if (trimmedMeal === '') return;
  const meal = {
    id: Date.now(),
    text: trimmedMeal,
    category: selectedCategory,
  }
  setMeals([...meals, meal]);

  setNewMeal('');
};

const startEdit = (meal) => {
  setEditingMealId(meal.id);
  setEditingMealText(meal.text);
}

const saveEdit = () => {
  setMeals((prevMeals) => prevMeals.map((meal) => meal.id === editingMealId ? {...meal, text: editingMealText} : meal));
  setEditingMealId(null);
  setEditingMealText('');
}

const cancelEdit = () => {
  setEditingMealId(null);
  setEditingMealText('');
}

const toggleEatenMeal = (idToToggle) => {
  setEatenMeals((prevEatenMeals) => prevEatenMeals.includes(idToToggle) ? prevEatenMeals.filter((id) => id !== idToToggle) : [...prevEatenMeals, idToToggle]);
}

const deleteMeal = (idToDelete) => {
  setMeals((prevMeal) => prevMeal.filter((meal) => meal.id !== idToDelete));
  setEatenMeals((prevEatenMeal) => prevEatenMeal.filter((id) => id !== idToDelete));
}


return(
  <div>
    <h1>Дневник еды</h1>
    <div className = 'input-wrapper'>
      <select value = {selectedCategory}
      onChange = {(e) => setSelectedCategory(e.target.value)}>
        <option value = 'breakfast'>Завтрак</option>
        <option value = 'lunch'>Обед</option>
        <option value = 'dinner'>Ужин</option>
      </select>
      <input type = 'text'
      placeholder = 'Запишите вашу еду'
      value = {newMeal}
      onChange = {(e) => setNewMeal(e.target.value)}
      onKeyDown = {(e) => e.key === 'Enter' && addMeal()}/>
      <button type = 'button' onClick = {addMeal}>Добавить</button>
    </div>
    <div>
      {['breakfast', 'lunch', 'dinner'].map((category) => {
        const categoryMeals = meals.filter((meal) => meal.category === category);
        if(categoryMeals.length === 0) return null;
        return(
          <div key = {category}>
            <h2>
              {category === 'breakfast' && 'Завтрак'}
              {category === 'lunch' && 'Обед'}
              {category === 'dinner' && 'Ужин'}
            </h2>
                <ul>
      {categoryMeals.map((meal) => (
        <li key = {meal.id}
            className = {eatenMeals.includes(meal.id) ? 'completed' : ''}>
            {meal.id === editingMealId ? (<>
            <input type = 'text'
            value = {editingMealText}
            onChange = {(e) => setEditingMealText(e.target.value)}/>

            <button type = 'button' onClick = {saveEdit} style = {{backgroundColor: 'green', cursor: 'pointer'}}>✓</button>
            <button type = 'button' onClick = {cancelEdit} style = {{backgroundColor: 'gray', cursor: 'pointer'}}>⨉</button></>) : (<>
            <span onClick = {() => toggleEatenMeal(meal.id)} style = {{textDecoration: eatenMeals.includes(meal.id) ? 'line-through' : 'none'}}>{meal.text}{' '}</span>

            <button type = 'button' onClick = {() => startEdit(meal)} style = {{display: eatenMeals.includes(meal.id) ? 'none' : 'block', backgroundColor: 'orange', cursor: 'pointer'}}>Ред.</button>
            <button type = 'button' onClick = {() => deleteMeal(meal.id)} style = {{display: eatenMeals.includes(meal.id) ? 'none' : 'block'}}>⨉</button></>)}
        </li>
      ))}
    </ul>
          </div>
        )
      })}
    </div>
  </div>
)
}

export default App;
