import React from "react";
import "./tab.css";

const Tab = ({ label, value, activeTab, onClick }) => {
  let className = "tab-list-item";
  if (activeTab === value) {
    className += " tab-list-active";
  }

  return (
    <li role="tab" className={className} onClick={onClick}>
      {label}
    </li>
  );
};

export default Tab;
