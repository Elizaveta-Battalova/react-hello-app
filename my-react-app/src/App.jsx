import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const [name, setName] = useState('');
const [age, setAge] = useState('');
const [apples, setApples] = useState('');
const [friends, setFriends] = useState('');

const [nameMessage, setNameMessage] = useState('');
const [ageMessage, setAgeMessage] = useState('');
const [calculateMessage, setCalculateMessage] = useState('');

const handleName = (e) => {
  setName(e.target.value)
}
const handleAge = (e) => {
  setAge(+e.target.value)
}

const handleApples = (e) => {
  setApples(+e.target.value)
}

const handleFriends = (e) => {
  setFriends(+e.target.value)
}

const handleNameMessage = () => {
  setNameMessage(
    name === 'Миха'
    ? `Здорова ${name}, панки хой!`
    : name !== ''
    ? `Привет, ${name}`
    : `Ты не написал как тебя зовут`
  );
}
const handleAgeMessage = () => {
  setAgeMessage(
    age >= 18
    ? `Ты взрослый`
    : `Ты ребенок`
  )
}

const calculateApples = () => {
  if(friends === '' || apples === "") {
    setCalculateMessage(`Введите количество яблок и друзей`);
    return
  }

  let remaining = apples - friends

  if (remaining < 0 ) {
    setCalculateMessage (`Не хватает яблок`)
  } else if (remaining === 0) {
    setCalculateMessage(`Раздал все яблоки`)
  } else {
    setCalculateMessage(`у тебя осталось ${remaining} яблок`)
};
}

return(
  <div>
    <h1>Познкомимся?</h1>
    <input type = 'text' placeholder = 'как вас зовут?' value = {name} onChange = {handleName}></input>
    <button onClick={handleNameMessage}>отправить</button>
    <p>{nameMessage}</p>
    <input type = 'number' placeholder = 'сколько вам лет?' value = {age} onChange = {handleAge}></input>
    <button onClick={handleAgeMessage}>отправить</button>
    <p>{ageMessage}</p>
    <input type = 'number' placeholder = 'сколько у вас яблок?' value = {apples} onChange = {handleApples}></input>
    <input type = 'number' placeholder = 'сколько у вас друзей?' value = {friends} onChange = {handleFriends}></input>
    <button onClick={calculateApples}>отправить</button>
    <p>{calculateMessage}</p>
  </div>
)

}
export default App
