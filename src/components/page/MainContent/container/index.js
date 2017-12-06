import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { About, Inbox, Todo, Game, Order } from 'views/index';

const HeaderContent = () => (
  <div>
    <Switch><Route path="/about" component={About} />
      <Route path="/inbox" component={Inbox} />
      <Route path="/todo" component={Todo} />
      <Route path="/game" component={Game} />
      <Route path="/order" component={Order} />
    </Switch>
  </div>
);

export default HeaderContent;
