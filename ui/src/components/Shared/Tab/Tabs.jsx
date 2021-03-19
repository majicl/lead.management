import React, { useState, useEffect } from "react";
import Tab from "./Tab.jsx";
import "./Tab.css";

const Tabs = ({ children, onChange = () => {}, defaultTab = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    onChange(activeTab);
  }, [activeTab]);

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map((child) => {
          const { value, label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={value}
              label={label}
              value={value}
              onClick={() => setActiveTab(value)}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.value !== activeTab)
            return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
