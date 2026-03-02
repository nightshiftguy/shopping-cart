import { Link } from "react-router";

export default function NavBar({itemsInCart}){
    let itemCount = itemsInCart.reduce((prev, item)=>prev+item.count, 0)
    return(
        <nav>
            <div className="left">
                <Link to='/'>Homepage</Link>
                <Link to='/shop'>Shop</Link>
                {itemCount>0 && <p data-testid="itemCount">Items in cart: {itemCount}</p>}
            </div>
        </nav>
    );
}