import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/Homepage";
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
            }
        ]
    }
]

export default routes;