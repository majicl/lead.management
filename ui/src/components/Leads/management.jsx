import { useHistory } from "react-router-dom";
import Tabs from "../Shared/Tab/Tabs.jsx";
import LeadsTab from "./leadsTab.jsx";

const LeadManagement = ({
  invitedTradies,
  accpetedTradies,
  loadingAcceptedTradies,
  loadingInvitedTradies,
  accpetedCount,
  invitedCount,
  updateLoadingstatus,
  location,
  defaultTab
}) => {
  const history = useHistory();

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
    const moreInfo = updateLoadingstatus ? "Loading..." : invitedCount;
    return `Invited (${moreInfo})`;
  };

  const getAcceptedHeader = () => {
    const moreInfo = updateLoadingstatus ? "Loading..." : accpetedCount;
    return `Accepted (${moreInfo})`;
  };

  const onTabChange = (tab) => {
    if (!location.pathname.includes(tab.toLowerCase()))
      history.push(tab.toLowerCase());
  };

  return (
    <Tabs onChange={onTabChange} defaultTab={defaultTab}>
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
