import React from "react";
import InfoCard from "./info.card.jsx";
import Empty from "./info.card.empty.jsx";

const InfoCardList = ({
  tradies = [],
  readonly = true,
  acceptTradie,
  declineTradie,
  loading
}) => {
  const action = readonly
    ? {}
    : {
        onAccept: acceptTradie,
        onDecline: declineTradie
      };
  const contactInfo = (tradie) =>
    readonly
      ? {
          phone: tradie.contactPhone,
          email: tradie.contactEmail
        }
      : null;
  return (
    <div>
      {tradies.length === 0 && !loading && <Empty />}
      {tradies.map((tradie) => (
        <InfoCard
          key={tradie.id}
          {...tradie}
          action={action}
          readonly={readonly}
          contactInfo={contactInfo(tradie)}
        />
      ))}
    </div>
  );
};
export default InfoCardList;
