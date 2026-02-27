import { useState } from "react";

export default function ShopItem({item, handleAddToCart}){
    const [itemCount, setItemCount] = useState(1);

    function handleAddClick(){
        setItemCount(itemCount+1);
    }

    function handleSubtractClick(){
        let newItemCount = itemCount - 1;
        if(newItemCount>0){
            setItemCount(newItemCount);
        }
    }

    function handleInput(e){
        setItemCount(e.target.value);
    }

    function validateItemCount(){
        if(!isNaN(itemCount) && isFinite(itemCount) && parseInt(itemCount) > 0){
            return parseInt(itemCount)
        }
        setItemCount(1);
        return 0;
    }

    return (
        <div className="shopItem">
            <img src={item.image}/>
            <h2>{item.title}</h2>
            <button data-testid="addButton" onClick={handleAddClick}>+</button>
            <input type="text" value={itemCount} onChange={handleInput}/>
            <button data-testid="subtractButton" onClick={handleSubtractClick}>-</button>
            <button data-testid="addToCartButton" onClick={()=>{handleAddToCart(item.id, validateItemCount())}}>Add to cart</button>
        </div>
    );
}