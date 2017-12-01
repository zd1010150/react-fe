import { Link, Route } from 'react-router-dom';
import React from 'react';
import Message from './message';


const Inbox = () => (
  <div>
    <ul>
      <li>

        <Link to="/inbox/message/1">message1</Link>
      </li>
      <li>
        <Link to="/inbox/message/2">message2</Link>
      </li>
    </ul>
    <Route path="/inbox/message/:id" component={Message} />
  </div>

);
export default Inbox;
