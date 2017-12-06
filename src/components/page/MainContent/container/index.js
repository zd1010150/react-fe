import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { About, Inbox, Todo, Game } from 'views/index';

const HeaderContent = () => (<div>
  <Switch><Route path="/about" component={About} />
    <Route path="/inbox" component={Inbox} />
    <Route path="/todo" component={Todo} />
    <Route path="/game" component={Game} />
  </Switch>
</div>);

export default HeaderContent;
