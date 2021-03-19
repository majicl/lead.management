import { Fragment } from "react";
import CardList from "../Tradie/info.card.list.container.jsx";
import Loader from "../Shared/Loaders/Loader.jsx";

export default ({ readOnly, tradies, loading }) => {
  return (
    <Fragment>
      {loading && <Loader />}
      <CardList tradies={tradies} readonly={readOnly} loading={loading} />
    </Fragment>
  );
};
