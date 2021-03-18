import React, { Suspense, lazy } from "react";
import "./info.card.css";

const ActionBar = lazy(() => import("./action.bar.jsx"));

const InfoCard = ({
  id,
  name,
  createdAt,
  suburb,
  category,
  description,
  contactInfo,
  action = {
    onDecline: () => {},
    onAccept: () => {}
  },
  loading
}) => {
  const header = () => {
    return (
      <header className="card-item header">
        <div className="logo">
          <strong>{name[0]}</strong>
        </div>
        <div className="info">
          <div>
            <strong>{name}</strong>
          </div>
          <div>{createdAt}</div>
        </div>
      </header>
    );
  };

  const splitter = () => {
    return <div className="splitter" />;
  };

  return (
    <div className="card">
      {loading && (
        <div>
          <i>Loading...</i>
        </div>
      )}
      {header()}
      {splitter()}
      <div className="card-item">
        <span className="label-item">
          📍
          {suburb}
        </span>
        <span className="label-item">
          🛠
          {category}
        </span>
        <span className="label-item">
          🧰 Job ID:
          {id}
        </span>
      </div>
      {splitter()}
      {contactInfo && (
        <div className="card-item">
          <span className="label-item">
            ☎️
            {contactInfo.phone}
          </span>
          <span className="label-item">
            ✉️
            {contactInfo.email}
          </span>
        </div>
      )}

      <p className="card-item">{description}</p>
      {splitter()}
      {action.active && (
        <section className="card-item">
          <Suspense fallback={<div>Loading...</div>}>
            <ActionBar
              onAccept={() => action.onAccept.call(this, id)}
              onDecline={() => action.onDecline.call(this, id)}
            />
          </Suspense>
        </section>
      )}
    </div>
  );
};
export default InfoCard;
