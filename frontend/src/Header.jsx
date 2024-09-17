import { Link } from "react-router-dom"

export default function Header(){
    return(
        <nav className="flex items-center justify-between w-full h-16 py-2 border-b-2 border-black px-28 mb-24">
            <Link to='/' className="text-2xl font-medium">VizApp</Link>
            <ul className="flex items-center h-16 text-xl">
                <li><Link to='/signin'>Sign In</Link></li>
                <li className="pl-20"><Link to='/signup'>Sign Up</Link></li>
            </ul>
        </nav>
    )
}