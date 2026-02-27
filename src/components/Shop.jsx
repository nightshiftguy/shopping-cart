import { useOutletContext } from 'react-router';
import ShopItem from '/src/components/ShopItem'

export default function Shop(){
    const {items, error, loading, handleAddToCart} = useOutletContext();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>A network error was encountered</p>;
    return (
        <ul className="shopList">
            {
                items.map((item)=><ShopItem item={item} key={item.id} handleAddToCart={handleAddToCart}/>)
            }
        </ul>
    );
}