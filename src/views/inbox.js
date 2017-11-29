import React from 'react'
import Message from './message'
import { Link,Route } from 'react-router-dom'
const Inbox = ({location})=>{

    return (
        <div>
            <ul>
                <li>

                    <Link to="/inbox/message/1">message1</Link>
                </li>
                <li>
                    <Link to="/inbox/message/2">message2</Link>
                </li>
            </ul>
            <Route path="/inbox/message/:id" component={Message}></Route>
        </div>

    )
}
export default Inbox