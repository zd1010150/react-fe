import React from 'react'
import Message from './message'
import { Link,Route } from 'react-router-dom'
const Inbox = ()=>{
    return (
        <div>
            <ul>
                <li>
                    <Link to="/message/1">message1</Link>
                </li>
                <li>
                    <Link to="/message/2">message2</Link>
                </li>
            </ul>
            <Route path="/message/:id" component={Message}></Route>
        </div>

    )
}
export default Inbox