import React from 'react';
import CardList from '../tradie/info.card.list.container.jsx';
import Loader from '../shared/Loaders/Loader.jsx';

export default ({ readOnly, tradies, loading }) => {
  return (
    <React.Fragment>
      {loading && <Loader />}
      <CardList tradies={tradies} readonly={readOnly} loading={loading} />
    </React.Fragment>
  );
};
