import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const [name, setName] = useState('');
const [message, setMessage] = useState('')

const [age, setAge] = useState('');
const [messageAge, setMessageAge] = useState('');

const [apples, setApples] = useState('');
const [friends,setFriends] = useState('');
const [friendMessage, setFriendMessage] = useState('')

const handleInput = (setter) => (e) => {
  setter(e.target.value)
}

const buttonName = () => {
  if (name === '') {
setMessage(`what is your name?`);
} else if (name === 'Лиза') {
  setMessage(`Привет, ${name}, ты большая молодец !`);
} else {
  setMessage(`Здравствуй, ${name}`);
}
}

const buttonAge = () => {
  if (age === '') {
  setMessageAge(`How old are you?`);
} else if (age >= 18) {
  setMessageAge(`Adult`);
} else {
  setMessageAge(`Child`);
}
}

const calculator = () => {
if(apples === '' || friends === '') {
 setFriendMessage(`enter apples and friends`)
 return;
}
let remaining = Number(apples) - Number(friends);

if(remaining === 0) {
  setFriendMessage(`no apples left`);
} else if (remaining < 0) {
  setFriendMessage(`not enough apples`);
} else {
  setFriendMessage(`you have ${remaining} apples`);
}
}

return (
  <div>
    <input type ='text' placeholder = 'your name' value = {name} onChange = {handleInput(setName)}></input>
    <button onClick = {buttonName}>send name</button>
    <p>{message}</p>

    <input type = 'number' placeholder = 'your age' value = {age} onChange = {handleInput(setAge)}></input>
    <button onClick = {buttonAge}>send age</button>
    <p>{messageAge}</p>

    <input type = 'number' placeholder = 'apples' value = {apples} onChange = {handleInput(setApples)}></input>
    <input type = 'number' placeholder = 'friends' value = {friends} onChange = {handleInput(setFriends)}></input>
    <button onClick = {calculator}>send apples</button>
    <p>{friendMessage}</p>

    <button onClick = {() => {alert('Hello!')}}>hello button</button>
  </div>
);
}
export default App