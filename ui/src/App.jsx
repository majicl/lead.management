import { Provider } from "react-redux";
import ErrorBoundary from "./error.boundary.jsx";
import configureStore from "./state-container/store/index.js";
import Router from "./router.jsx";
import Layout from "./components/Layout/layout.jsx";
import Socket from "./Socket.jsx";

export default () => (
  <Provider store={configureStore()}>
    <ErrorBoundary>
      <Socket />
      <Layout>
        <Router />
      </Layout>
    </ErrorBoundary>
  </Provider>
);
