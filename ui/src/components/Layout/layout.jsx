import React, { Fragment } from 'react';
import Navbar from './navbar.jsx';
import Sidebar from './sidebar.jsx';

export default ({ children }) => {
  const menuItems = [
    {
      title: 'Lead Management',
      uri: '/'
    }
  ];

  return (
    <Fragment>
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar menuItems={menuItems} />
        {children}
      </div>
    </Fragment>
  );
};
