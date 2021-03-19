import { Fragment } from "react";
import Loader from "../Shared/Loaders/Loader.jsx";

export const withLoader = (Component) => (props) => (
  <Fragment>
    {props.loading && <Loader />}
    <Component {...props} />
  </Fragment>
);
