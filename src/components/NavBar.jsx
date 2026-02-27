import { Link } from "react-router";

export default function NavBar(){
    return(
        <nav>
            <div className="left">
                <Link to='/'>Homepage</Link>
            </div>
        </nav>
    );
}