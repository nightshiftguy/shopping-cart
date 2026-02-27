import mainImg from '/src/assets/img/homepage.jpg'

export default function HomePage(){
    return(
        <section>
            <h1>Welcome to the store! Select your items in shop and see them appear in your cart.</h1>
            <img src={mainImg} alt="" className='main-img'/>
        </section>
    );
}