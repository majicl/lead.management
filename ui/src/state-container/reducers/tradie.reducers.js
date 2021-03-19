import { handleActions } from "../../utils";
import types from "../actions/tradie.action.types.js";

const { LOAD_INVITED, LOAD_ACCEPTED, UPDATE_NOTIFICATION, LOAD_UPDATE } = types;

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
  },
  statusLoading: true
};

const loadAccepted = {
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
    FULFILLED: (state, { payload }) => {
      return {
        ...state,
        accpeted: {
          ...state.accpeted,
          initiated: true,
          loading: false,
          list: [...payload]
        }
      };
    },
    REJECTED: (state, { payload }) => {
      return {
        ...state,
        error: payload,
        accpeted: {
          ...state.accpeted,
          loading: false
        }
      };
    }
  }
};

const loadInvited = {
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
    FULFILLED: (state, { payload }) => {
      return {
        ...state,
        invited: {
          ...state.invited,
          initiated: true,
          loading: false,
          list: [...payload]
        }
      };
    },
    REJECTED: (state, { payload }) => {
      return {
        ...state,
        error: payload,
        invited: {
          ...state.invited,
          loading: false
        }
      };
    }
  }
};

const upateToState = (state, { payload }) => ({
  ...state,
  statusLoading: false,
  accpeted: {
    ...state.accpeted,
    count: payload.acceptedCount,
    lastAccepted: payload.lastAccepted,
    initiated: false
  },
  invited: {
    ...state.invited,
    count: payload.invitedCount,
    lastInvited: payload.lastInvited
  }
});

const loadUpdate = {
  [LOAD_UPDATE]: {
    PENDING: (state) => {
      return {
        ...state,
        statusLoading: true
      };
    },
    FULFILLED: upateToState,
    REJECTED: (state, { payload }) => {
      return {
        ...state,
        error: payload
      };
    }
  }
};

const reducers = {
  ...loadAccepted,
  ...loadInvited,
  ...loadUpdate,
  [UPDATE_NOTIFICATION]: upateToState
};

export default handleActions(INITIAL_STATE, reducers);
