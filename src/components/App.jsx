import { Outlet } from 'react-router'
import NavBar from './NavBar'
import '/src/styles/App.css'
import { useState, useEffect } from 'react'

const useItems = ()=>{
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    fetch('https://fakestoreapi.com/products')
    .then((response)=>{
      if(response.status >= 400){
        throw new Error("server error");
      }
      return response.json();
    })
    .then((response)=>{
      setItems(response);
      setError(null);
    })
    .catch((error) => {
      setError(error)
      setItems(null)
    })
    .finally(() => setLoading(false));
  } ,[]);

  return { items, error, loading };
}

function App() {
  const { items, error, loading } = useItems();

  function handleAddToCart(itemId, itemCount){
    console.log("Add item to cart: "+items[itemId].title+" count: "+itemCount)
  }

  return (
    <>
    <NavBar/>
    <main>
      <Outlet context={{items, error, loading, handleAddToCart}}/>
    </main>
    </>
  )
}

export default App
