import { handleActions } from "../../utils";
import types from "../actions/tradie.action.types.js";

const { LOAD_INVITED, LOAD_ACCEPTED, UPDATE_NOTIFICATION } = types;

const INITIAL_STATE = {
  invited: {
    list: [],
    initiated: false,
    count: 0,
    loading: false
  },
  accpeted: {
    list: [],
    initiated: false,
    count: 0,
    loading: false
  }
};

const reducers = {
  [LOAD_INVITED]: {
    PENDING: (state) => {
      return {
        ...state,
        invited: {
          ...state.invited,
          loading: true
        },
        error: undefined
      };
    },
    FULFILLED: (state, action) => {
      return {
        ...state,
        invited: {
          initiated: true,
          list: [...action.payload],
          count: action.payload.length,
          loading: false
        }
      };
    },
    REJECTED: (state, action) => {
      return {
        ...state,
        error: action.payload,
        invited: {
          ...state.invited,
          loading: false
        }
      };
    }
  },
  [LOAD_ACCEPTED]: {
    PENDING: (state) => {
      return {
        ...state,
        accpeted: {
          ...state.accpeted,
          loading: true
        },
        error: undefined
      };
    },
    FULFILLED: (state, action) => {
      return {
        ...state,
        accpeted: {
          initiated: true,
          list: [...action.payload],
          count: action.payload.length,
          loading: false
        }
      };
    },
    REJECTED: (state, action) => {
      return {
        ...state,
        error: action.payload,
        accpeted: {
          ...state.accpeted,
          loading: false
        }
      };
    }
  },
  [UPDATE_NOTIFICATION]: (state, { update }) => {
    return {
      ...state,
      accpeted: {
        ...state.accpeted,
        count: update.acceptedCount,
        lastAccepted: update.lastAccepted
      },
      invited: {
        ...state.invited,
        count: update.acceptedCount,
        lastInvited: update.lastInvited
      }
    };
  }
};

export default handleActions(INITIAL_STATE, reducers);
