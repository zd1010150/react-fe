import React from 'react';
import { Link, Route } from 'react-router-dom';
import AddTodo from './Add';
import VisibleTodoList from './VisibleTodoList';
import Footer from '../component/Footer';

import ReddipostsView from '../../Reddiposts/container';

const Todolist = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <Link to="/todo/reddiposts">reddi</Link>
    <Route path="/todo/reddiposts" component={ReddipostsView} />
  </div>
);
export default Todolist;
