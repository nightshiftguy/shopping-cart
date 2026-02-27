import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/Homepage";
import Shop from "./components/Shop";
import App from "/src/components/App";

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
            }
        ]
    }
]

export default routes;