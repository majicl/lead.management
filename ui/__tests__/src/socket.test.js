import React from "react";
import * as signalR from "@microsoft/signalr";
import Socket, { eventHandler } from "../../src/Socket.jsx";
import config from "../../src/config.js";
import { render } from "@testing-library/react";

// mock the file and its named export
jest.mock("../../src/state-container/store", () => ({
  store: {
    dispatch: jest.fn()
  }
}));

const socketConfigs = config.get().socket;

let wrapper;
let useEffect;
let useStateSpy;
jest.mock("@microsoft/signalr", () => {
  const on = jest.fn();
  const start = jest.fn();
  const stop = jest.fn();
  class HubConnectionBuilder {
    withUrl() {
      return {
        build: () => ({
          on,
          start,
          stop
        })
      };
    }
  }

  const socket = { HubConnectionBuilder };
  return socket;
});

describe("<Socket />", () => {
  beforeEach(() => {
    wrapper = render(<Socket key={new Date().getTime()} />);
    useEffect = jest.fn();
    useStateSpy = jest.spyOn(React, "useEffect");
    useStateSpy.mockImplementation((init) => [init, useEffect]);
  });

  it("listens for the MESSAGE event", () => {
    const socket = new signalR.HubConnectionBuilder().withUrl().build();
    expect(socket.on).toHaveBeenCalledWith(
      socketConfigs.notifyLeadChangesEventName,
      eventHandler
    );
  });

  it("start fn has been called", () => {
    const socket = new signalR.HubConnectionBuilder().withUrl().build();
    expect(socket.start).toHaveBeenCalled();
  });
  
});
