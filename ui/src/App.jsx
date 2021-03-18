import React from "react";
import ErrorBoundary from "./error.boundary.jsx";
import Layout from "./components/Layout/layout.jsx";

export default () => (
  <ErrorBoundary>
    <Layout></Layout>
  </ErrorBoundary>
);
