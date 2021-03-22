import React, { Suspense, lazy } from "react";
import Splitter from "../Shared/Splitters/splitter.jsx";
import Price from "./price.jsx";

import "./info.card.css";

const ActionBar = lazy(() => import("./action.bar.jsx"));

const InfoCard = ({
  id,
  contactFirstName,
  contactLastName,
  createdAtDate,
  createdAtTime,
  suburb,
  category,
  description,
  contactInfo,
  price,
  readonly,
  action,
  loading
}) => {
  const Header = () => {
    return (
      <header className="card-item header">
        <div className="logo">
          <strong>
            {contactFirstName[0]}
            {(contactLastName || "")[0]}
          </strong>
        </div>
        <div className="info">
          <div>
            <strong>
              {contactFirstName} {contactLastName}
            </strong>
          </div>
          <div>
            {createdAtDate} @ {createdAtTime}
          </div>
        </div>
      </header>
    );
  };

  return (
    <div role="listitem" className="card">
      {loading && (
        <div>
          <i>Loading...</i>
        </div>
      )}
      {Header()}
      <Splitter />
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
        {readonly && (
          <span className="label-item">
            <Price price={price} label="Lead Invitation" />
          </span>
        )}
      </div>
      <Splitter />
      {contactInfo && (
        <div className="card-item">
          <a href={`tel:${contactInfo.email}`} className="label-item">
            ☎️
            {contactInfo.phone}
          </a>
          <a href={`mailto:${contactInfo.email}`} className="label-item">
            ✉️
            {contactInfo.email}
          </a>
        </div>
      )}

      <p className="card-item">{description}</p>
      <Splitter />
      {!readonly && (
        <div className="action-container">
          <section className="card-item">
            <Suspense fallback={<div>Loading...</div>}>
              <ActionBar
                onAccept={() => action.onAccept.call(this, id)}
                onDecline={() => action.onDecline.call(this, id)}
              />
            </Suspense>
          </section>
          <Price price={price} label="Lead Invitation" />
        </div>
      )}
    </div>
  );
};
export default InfoCard;
