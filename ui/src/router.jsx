import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LeadManagement from "./components/Leads/management.container.jsx";

// router management
export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/:tab" component={LeadManagement} />
    </Switch>
  </BrowserRouter>
);