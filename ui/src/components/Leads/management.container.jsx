import { useEffect } from "react";
import { connect } from "react-redux";
import LeadManagement from "./management.jsx";
import { withRouter } from "react-router-dom";
import { loadTradiesActionCreator } from "../../state-container/actions/tradie.actions";
import { tradiesSelector } from "../../state-container/selectors/tradies.selector.js";

const mapStatetoProps = (state) => tradiesSelector(state);

const LeadManagementContainer = (props) => {
  const { loadInvitedTradies, loadAcceptedTradies, location } = props;

  useEffect(() => {
    if (pathToTabName() !== "Invited") {
      loadAcceptedTradies();
    } else {
      loadInvitedTradies();
    }
  }, [location]);

  const pathToTabName = () => {
    if (location.pathname.toLowerCase() !== "/invited") {
      return "Accepted";
    }
    return "Invited";
  };

  return <LeadManagement {...props} defaultTab={pathToTabName()} />;
};

export default connect(
  mapStatetoProps,
  loadTradiesActionCreator
)(withRouter(LeadManagementContainer));
