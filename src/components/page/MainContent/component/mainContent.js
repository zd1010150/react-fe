/* eslint-disable react/no-typos */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Order, MarketingMaterials, Accounts, Leads, PriceSetting, TrackOrders, Error, Inventory } from 'views/index';

const mainContentView = () => (
  <Switch>
    <Route path="/order" component={Order} />
    <Route path="/accounts" component={Accounts} />
    <Route path="/leads" component={Leads} />
    <Route path="/trackOrders" component={TrackOrders} />
    <Route path="/priceSetting" component={PriceSetting} />
    <Route path="/marketingMaterial" component={MarketingMaterials} />
    <Route path="/inventory" component={Inventory} />
    <Route render={() => <Redirect to="/error?action=ERROR_404" />} />
  </Switch>
);
export default mainContentView;
