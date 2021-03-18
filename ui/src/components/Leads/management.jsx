import React from 'react';
import Tabs from '../shared/Tab/Tabs.jsx';
import LeadsTab from './leadsTab.jsx';

const LeadManagement = ({
  loadInvitedTradies,
  loadAcceptedTradies,
  invitedTradies,
  accpetedTradies,
  loadingAcceptedTradies,
  loadingInvitedTradies,
  accpetedCount,
  invitedCount
}) => {
  const getInvitedCardList = () => {
    return (
      <LeadsTab
        tradies={invitedTradies}
        loading={loadingInvitedTradies}
        readOnly={false}
      />
    );
  };

  const getAcceptedCardList = () => {
    return (
      <LeadsTab
        tradies={accpetedTradies}
        loading={loadingAcceptedTradies}
        readOnly
      />
    );
  };

  const getInvitedHeader = () => {
    const moreInfo = loadingInvitedTradies ? 'Loading...' : invitedCount;
    return `Invited (${moreInfo})`;
  };

  const getAcceptedHeader = () => {
    const moreInfo = loadingAcceptedTradies ? 'Loading...' : accpetedCount;
    return `Accepted (${moreInfo})`;
  };

  const onTabChange = (tab) => {
    if (tab === 'Invited') {
      loadInvitedTradies();
    } else {
      loadAcceptedTradies();
    }
  };

  return (
    <Tabs onChange={onTabChange}>
      <div value="Invited" label={getInvitedHeader()}>
        {getInvitedCardList()}
      </div>
      <div value="Accepted" label={getAcceptedHeader()}>
        {getAcceptedCardList()}
      </div>
    </Tabs>
  );
};

export default LeadManagement;
