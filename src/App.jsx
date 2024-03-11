import { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import {randomColor} from 'randomcolor'
import Draggable from 'react-draggable'

import './App.css'


function App() {
  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  ) // Получаем данные из localStorage

  // Заносим данные в localStorage
  useEffect (() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  // Добавление новой задачи
  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: uuidv4(),
        item,
        color: randomColor({
          luminosity: 'light',
        }),
        defaultPos: {
          x: 500,
          y: -500
        }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    } else {
      alert('Enter Something...')
      setItem('')
    }
  }

  // Удаление задачи
  const deleteNote = (id) => {
    const del = items.filter(e => e.id !== id)
    setItems(del)
  }

  // Обновление позиции 
  const updatePos = (data, index) => {
    let newArr = [...items]
    newArr[index].defaultPos = {x: data.x, y: data.y}
    setItems(newArr)
  }

  // Добавление задачи кнопкой Enter
  const keyPress = (e) => {
    const code = e.key
    if (code === 'Enter') {
      newItem()
    }
  }

  return (
    <>
    <div className='wrapper'>
      <input 
      type="text" 
      placeholder='Enter Something...'
      onChange={(e) => setItem(e.target.value)}
      onKeyDown={(e) => keyPress(e)}
      value={item}
      />
      <button 
      className='enter'
      onClick={() => newItem()}
      >Enter</button>
    </div>
      {
        items.map((item, index) => {
          return (
            <Draggable 
            key={index} 
            defaultPosition={item.defaultPos}
            onStop={(_, data) => {
              updatePos(data, index)
            }}
            >

              <div className='todo__item' style={{backgroundColor: item.color}}>
                {`${item.item}`}
                <button className='delete' onClick={() => deleteNote(item.id)}>X</button>
              </div>

            </Draggable>
          )
        })
      }
    </>
    
  )
}

export default App
