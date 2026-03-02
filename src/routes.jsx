import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/Homepage";
import Shop from "./components/Shop";
import App from "/src/components/App";
import Cart from "/src/components/Cart";

const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'shop',
                element: <Shop/>
            },
            {
                path: 'cart',
                element: <Cart/>
            }
        ]
    }
]

export default routes;