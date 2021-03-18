import React from 'react';
import CardList from '../Tradie/info.card.list.container.jsx';
import Loader from '../Shared/Loaders/Loader.jsx';

export default ({ readOnly, tradies, loading }) => {
  return (
    <React.Fragment>
      {loading && <Loader />}
      <CardList tradies={tradies} readonly={readOnly} loading={loading} />
    </React.Fragment>
  );
};
