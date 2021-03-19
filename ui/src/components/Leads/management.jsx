import { Suspense, lazy } from "react";
import { useHistory } from "react-router-dom";
import Tabs from "../Shared/Tab/Tabs.jsx";
import CardList from "../Tradie/info.card.list.container.jsx";
import './management.css';
const Error = lazy(() => import("../Shared/api.error.generic.jsx"));


const LeadManagement = ({
  invitedTradies,
  accpetedTradies,
  loadingAcceptedTradies,
  loadingInvitedTradies,
  accpetedCount,
  invitedCount,
  updateLoadingstatus,
  location,
  defaultTab,
  error
}) => {
  const history = useHistory();
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
    <main>
      {error && (
        <Suspense fallback={<div>Loading...</div>}>
          <Error />
        </Suspense>
      )}
      {!error && (
        <Tabs onChange={onTabChange} defaultTab={defaultTab}>
          <div value="Invited" label={getInvitedHeader()}>
            <CardList
              tradies={invitedTradies}
              readonly={false}
              loading={loadingInvitedTradies}
            />
          </div>
          <div value="Accepted" label={getAcceptedHeader()}>
            <CardList
              tradies={accpetedTradies}
              readonly={true}
              loading={loadingAcceptedTradies}
            />
          </div>
        </Tabs>
      )}
    </main>
  );
};

export default LeadManagement;
