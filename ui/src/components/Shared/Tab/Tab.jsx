import React from 'react';

const Tab = ({ label, value, activeTab, onClick }) => {
  let className = 'tab-list-item';
  if (activeTab === value) {
    className += ' tab-list-active';
  }

  return (
    <li className={className} onClick={onClick}>
      {label}
    </li>
  );
};

export default Tab;
