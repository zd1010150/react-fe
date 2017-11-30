import React from 'react'
import { Link } from 'react-router-dom'

const Header = () =>{
    return (
        <ul>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/game">Game</Link>
            </li>
            <li>
                <Link to="/todo">Todo</Link>
            </li>
            <li>
                <Link to="/inbox">Inbox</Link>
            </li>
            <li>
                <Link to="/reddiposts">reddiposts</Link>
            </li>

        </ul>
    )
}
export default Header