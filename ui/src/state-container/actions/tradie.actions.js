import types from "./tradie.action.types";
import {
  getInvited,
  getAccepted,
  getStatus,
  acceptTradieById,
  declineTradieById
} from "../../api/tradies.provider";

const { LOAD_INVITED, LOAD_ACCEPTED, UPDATE_NOTIFICATION, LOAD_UPDATE } = types;

const dispatchLoadInvited = (dispatch) =>
  dispatch({
    type: LOAD_INVITED,
    payload: getInvited
  });

const dispatchLoadAccepted = (dispatch) =>
  dispatch({
    type: LOAD_ACCEPTED,
    payload: getAccepted
  });

export const loadInvitedTradies = () => (dispatch, getState) => {
  const { invited } = getState().tradies;
  if (invited.initiated) return;

  dispatchLoadInvited(dispatch);
};

export const loadAcceptedTradies = () => (dispatch, getState) => {
  const { accpeted } = getState().tradies;
  if (accpeted.initiated) return;

  dispatchLoadAccepted(dispatch);
};

export const acceptTradie = (tradieId) => async (dispatch) => {
  await acceptTradieById(tradieId);
  dispatchLoadInvited(dispatch);
};

export const declineTradie = (tradieId) => async (dispatch) => {
  await declineTradieById(tradieId);
  dispatchLoadInvited(dispatch);
};

export const leadUpdate = (payload) => (dispatch, getState) => {
  const {
    tradies: { accpeted }
  } = getState();
  
  // location could be in the store
  const isInvitedDataNeedsToBeReloaded =
    location.pathname.toLowerCase().includes("invited");

  const isAcceptedDataNeedsToBeReloaded =
    location.pathname.toLowerCase().includes("accepted") &&
    accpeted.lastAccepted !== payload.lastAccepted;

  if (isInvitedDataNeedsToBeReloaded) {
    dispatchLoadInvited(dispatch);
  }

  if (isAcceptedDataNeedsToBeReloaded) {
    dispatchLoadAccepted(dispatch);
  }

  dispatch({
    type: UPDATE_NOTIFICATION,
    payload
  });
};

export const loadLeadsUpdate = () => (dispatch) => {
  dispatch({
    type: LOAD_UPDATE,
    payload: getStatus
  });
};

export const loadTradiesActionCreator = {
  loadInvitedTradies,
  loadAcceptedTradies
};

export const changeStatusTradiesActionCreator = {
  acceptTradie,
  declineTradie
};
