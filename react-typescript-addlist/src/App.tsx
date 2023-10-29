import { useState } from 'react'
import './App.css'
import {Item, ItemID} from '../types'
import ItemsList from "../components/ItemsList"

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState<string>('');
  const onChangueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message?.length) return
    const newItem: Item = {
      id: crypto.randomUUID(),
      value: message,
      timestamp: Date.now()
    }
    setItems(prevItems => { return [...prevItems, newItem] })
    setMessage("")
  }
  const toggleDeleteItem = (id: ItemID) => {
    setItems(prevItems => { return prevItems.filter(item => item.id != id) })
  }

  return (
    <main>
      <aside>
        <h1>Prueba Tecnica Añadir Lista</h1>
        <form onSubmit={handleOnSubmit} aria-label='Data Item'>
          <label htmlFor="element">Elemento a introducir:
            <input onChange={onChangueInput} value={message} type="text" required name='element' placeholder='Elemento nuevo' />
          </label>
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>

      <ItemsList items={items} deleteItem={toggleDeleteItem} />
      
    </main>
  )
}

export default App
