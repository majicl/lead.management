import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LeadManagement from "~/Leads/management.container.jsx";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/:tab" component={LeadManagement} />
      <Route path="/">
        <Redirect exact to="/invited" />
      </Route>
    </Switch>
  </BrowserRouter>
);
