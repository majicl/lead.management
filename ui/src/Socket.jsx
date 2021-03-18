import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import config from "./config.js";
import { leadUpdate } from "./state-container/actions/tradie.actions.js";
import { store } from "./state-container/store";

export const eventHandler = (update) => {
  store.dispatch(leadUpdate(update));
};

export default () => {
  const socketConfig = config.get().socket;
  useEffect(() => {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl(socketConfig.url)
      .build();

    connection.on(socketConfig.notifyLeadChangesEventName, eventHandler);
    connection.start({ withCredentials: false });
    
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  });
  return null;
};
