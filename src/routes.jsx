import ErrorPage from "./components/ErrorPage";
import App from "/src/components/App";

const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>
    }
]

export default routes;