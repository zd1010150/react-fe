import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, DatePicker } from 'antd';
import AddTodo from './Add';
import VisibleTodoList from './VisibleTodoList';
import Footer from '../component/Footer/index';

import ReddipostsView from '../../Reddiposts';


const Todolist = () => (
  <div>
    <DatePicker />
    <Button type="primary">Button</Button>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <Link to="/todo/reddiposts">reddi</Link>
    <Route path="/todo/reddiposts" component={ReddipostsView} />
  </div>
);

export default Todolist;
