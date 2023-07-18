import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { User } from './types';
import UsersList from './components/UsersList';

function App() {
  
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState<boolean>(false);
  const [sortCountry, setSortCountry] = useState<boolean>(false);
  const [filterCountry, setFilterCountry] = useState<string>('');
  const originalState = useRef<User[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
    .then(async res => await res.json())
    .then(res => {
      setUsers(res.results)
      originalState.current = res.results;
    }).catch(e => console.log(e));
  },[])

  const toggleShowColors = () => setShowColors(!showColors);
  const toggleSortCountry = () => setSortCountry(!sortCountry);
  const restoreState = () => setUsers(originalState.current);
  const deleteUser = (email:string) => setUsers(prevUsers => prevUsers.filter(user => user.email !== email));

  const filterByCountry = useMemo<User[]>(() => {
    console.log("Filter Users")
    return (filterCountry.length > 0) ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      :
    users
  },[filterCountry,users])

  const sortedUsers = useMemo<User[]>(() =>{
    console.log("Sorted Users")
    return sortCountry ? 
       [...filterByCountry].sort((a,b) => { return a.location.country.localeCompare(b.location.country)})
    :
      filterByCountry
  },[filterByCountry,sortCountry])

  

  return (
    <>
      <header>
        <h1>Prueba técnica</h1>
        <div style={{marginBottom: "3rem"}}>
          <button onClick={toggleShowColors}>Colorear Filas</button>
          <button onClick={toggleSortCountry}>{!sortCountry ? "Ordenar por pais" : "Desordenar por pais"}</button>
          <button onClick={restoreState}>Resetear estado</button>
          <input onChange={e => setFilterCountry(e.currentTarget.value)} value={filterCountry} type="text" placeholder='Filtrar por pais ' />
        </div>
      </header>
      <UsersList users={sortedUsers} showColors={showColors} deleteUser={deleteUser}/>
    </>
  )
}

export default App
