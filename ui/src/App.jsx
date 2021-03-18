import React from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from './error.boundary.jsx';
import configureStore from './state-container/store/index.js';
import LeadManagement from './components/Leads/management.container.jsx';
import Layout from './components/Layout/layout.jsx';

export default () => (
  <Provider store={configureStore()}>
    <ErrorBoundary>
      <Layout>
        <LeadManagement />
      </Layout>
    </ErrorBoundary>
  </Provider>
);
