import { useEffect, useState } from "react";

export default function CartItem({item, handleAddToCart, handleRemoveFromCart, setItemCount}){
    const [count, setCount] = useState(item.count);

    useEffect(()=>{
        setCount(item.count)
    },[item.count])

    function handleInput(e){
        setCount(e.target.value);
    }

    function validateItemCount(){
        if(!isNaN(count) && isFinite(count) && parseInt(count) > 0){
            return parseInt(count)
        }
        setCount(item.count);
        return item.count;
    }

    function handleKeyDown(e){
        if(e.key==='Enter'){setItemCount(item.id, validateItemCount())}
    }

    return (
        <div className="cartItem">
            <h2>{item.title}</h2>
            <p>price: {item.price}</p>
            <button data-testid="addButton" onClick={()=>{handleAddToCart(item.id, 1)}}>+</button>
            <input type="text" value={count} onChange={handleInput} 
            onBlur={()=>{
                setItemCount(item.id, validateItemCount())
            }}
            onKeyDown={handleKeyDown}
            />
            <button data-testid="subtractButton" onClick={()=>{handleRemoveFromCart(item.id, 1)}} disabled={item.count<=1}>-</button>
            <button data-testid="removeButton" onClick={()=>{handleRemoveFromCart(item.id)}} className="removeButton">remove item</button>
        </div>
    );
}