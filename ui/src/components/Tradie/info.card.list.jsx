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
  return (
    <div>
      {tradies.length === 0 && !loading && <Empty />}
      {tradies.map((tradie) => (
        <InfoCard
          key={tradie.id}
          {...tradie}
          action={action}
          readonly={readonly}
        />
      ))}
    </div>
  );
};
export default InfoCardList;
