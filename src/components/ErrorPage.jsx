import { Link } from "react-router";

export default function ErrorPage(){
    return (
        <>
        <h1>Oops! This page doesn't exits</h1>
        <Link to='/'>Back to main page</Link>
        </>
    );
}