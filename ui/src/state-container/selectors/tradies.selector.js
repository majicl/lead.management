import { createSelector } from "reselect";

const invitedSelector = (state) => state.tradies.invited.list || [];
const acceptedSelector = (state) => state.tradies.accpeted.list || [];
const invitedCountSelector = (state) => state.tradies.invited.count;
const acceptedCountSelector = (state) => state.tradies.accpeted.count;
const loadingInvitedTradiesSelector = (state) => state.tradies.invited.loading;
const loadingAcceptedTradiesSelector = (state) =>
  state.tradies.accpeted.loading;
const updateLoadingstatusLoadingSelector = (state) => state.tradies.statusLoading;

export const tradiesSelector = createSelector(
  invitedSelector,
  acceptedSelector,
  loadingInvitedTradiesSelector,
  loadingAcceptedTradiesSelector,
  invitedCountSelector,
  acceptedCountSelector,
  updateLoadingstatusLoadingSelector,
  (
    invitedTradies,
    accpetedTradies,
    loadingInvitedTradies,
    loadingAcceptedTradies,
    invitedCount,
    accpetedCount,
    updateLoadingstatus
  ) => {
    return {
      invitedTradies,
      accpetedTradies,
      loadingInvitedTradies,
      loadingAcceptedTradies,
      invitedCount,
      accpetedCount,
      updateLoadingstatus
    };
  }
);
