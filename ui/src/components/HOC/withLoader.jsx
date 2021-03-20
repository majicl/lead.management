import React, { Fragment } from "react";
import Loader from "../Shared/Loaders/loader.jsx";

export const withLoader = (Component) => (props) => (
  <Fragment>
    {props.loading && <Loader />}
    <Component {...props} />
  </Fragment>
);
