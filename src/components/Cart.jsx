import { useOutletContext } from 'react-router';
import CartItem from '/src/components/CartItem'

export default function Cart(){
    const {itemsInCart, handleAddToCart, handleRemoveFromCart, setItemCount} = useOutletContext();
    return (
        <ul className="cartList">
            {
                itemsInCart.length > 0 ? itemsInCart.map((item)=><CartItem item={item} key={item.id} {...{handleAddToCart, handleRemoveFromCart, setItemCount}}/>) : <p>Cart is empty</p>
            }
        </ul>
    );
}