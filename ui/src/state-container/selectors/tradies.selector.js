import { createSelector } from 'reselect';

const invitedSelector = (state) => state.tradies.invited.list || [];
const acceptedSelector = (state) => state.tradies.accpeted.list || [];
const invitedCountSelector = (state) => state.tradies.invited.count;
const acceptedCountSelector = (state) => state.tradies.accpeted.count;
const loadingInvitedTradiesSelector = (state) => state.tradies.invited.loading;
const loadingAcceptedTradiesSelector = (state) =>
  state.tradies.accpeted.loading;

export const tradiesSelector = createSelector(
  invitedSelector,
  acceptedSelector,
  loadingInvitedTradiesSelector,
  loadingAcceptedTradiesSelector,
  invitedCountSelector,
  acceptedCountSelector,
  (
    invitedTradies,
    accpetedTradies,
    loadingInvitedTradies,
    loadingAcceptedTradies,
    invitedCount,
    accpetedCount
  ) => {
    return {
      invitedTradies,
      accpetedTradies,
      loadingInvitedTradies,
      loadingAcceptedTradies,
      tradiesCount: invitedTradies.length + accpetedTradies.length,
      invitedCount,
      accpetedCount
    };
  }
);