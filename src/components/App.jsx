import { Outlet } from 'react-router'
import NavBar from './NavBar'
import '/src/styles/App.css'
import useItems from '/src/useItems'
import { useState } from 'react'

function App() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const { items, error, loading } = useItems();
  
  function setItemCount(itemId, count){
    let newItems = [...itemsInCart];
    let itemIndex = newItems.findIndex((item)=>item.id===itemId);
    let newItem = {...newItems[itemIndex], count};
    newItems[itemIndex] = newItem;
    setItemsInCart(newItems);
  }

  function handleAddToCart(itemId, itemCount){
    let newItems = [...itemsInCart];
    let itemIndex = newItems.findIndex((item)=>item.id===itemId);
    if(itemIndex<0){
      //item don't exists - itemIndex=-1
      const newItem = items.find((item)=>item.id===itemId)
      newItems.push({...newItem, count: itemCount});
    }else{
      //item already in cart - add count
      let newItem = newItems[itemIndex];
      newItem = {...newItem, count: newItem.count+itemCount};
      newItems[itemIndex] = newItem;
    }
    setItemsInCart(newItems);
  }

  function handleRemoveFromCart(itemId, itemCount=undefined){
    let newItems = [...itemsInCart];
    let itemIndex = newItems.findIndex((item)=>item.id===itemId);
    if(itemIndex<0){
      //item don't exists - itemIndex=-1
      return null;
    } else if(itemCount===undefined || newItems[itemIndex].count - itemCount <= 0){
      //delete whole item in cart
      newItems = newItems.filter((item)=>item.id!==itemId)
    } else{
      //decrease itemCount
      let newItem = newItems[itemIndex];
      let newCount = newItem.count - itemCount;
      
      newItem = {...newItem, count: newCount};
      newItems[itemIndex] = newItem;
    }
    setItemsInCart(newItems);
  }

  return (
    <>
    <NavBar itemsInCart={itemsInCart}/>
    <main>
      <Outlet context={{items, error, loading, itemsInCart, handleAddToCart, handleRemoveFromCart, setItemCount}}/>
    </main>
    </>
  )
}

export default App
