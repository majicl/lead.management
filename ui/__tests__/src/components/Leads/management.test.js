import "@testing-library/jest-dom";
import React from "react";
import { createStore } from "redux";
import { Router } from 'react-router-dom';
import { Provider } from "react-redux";
import {
  render,
  screen,
  waitFor,
  cleanup,
  fireEvent
} from "@testing-library/react";
import Management from "~/Leads/management.jsx";

describe("<Management />", () => {
  const renderWithRedux = (
    children,
    initialState = {
      invited: {
        count: 0
      },
      accepted: {
        count: 0
      }
    },
    mockedReducer = (state) => state
  ) => {
    const store = createStore(mockedReducer, initialState);
    const component = <Provider store={store}>{children}</Provider>;
    return {
      ...render(component),
      component
    };
  };

  afterAll(cleanup);

  it("The <Error /> element is rendered", async () => {
    //arrage - act
    render(<Management location={{ pathname: "/invited" }} error={true} />);

    // assert
    const text =
      "The API does not respond at the moment, please contact administrator 😩";
    await waitFor(() => screen.getByText(text));
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("The <Tabs /> element is rendered with two tabs", () => {
    //arrage - act
    render(<Management location={{ pathname: "/invited" }} error={false} />);

    //assert
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveTextContent("Invited");
    expect(tabs[1]).toHaveTextContent("Accepted");
  });

  it("The Invited list will be rendered as default", () => {
    //arrage
    const invitedTradies = [{ id: 1, contactFirstName: "Alex" }];
    const accpetedTradies = [{ id: 2, contactFirstName: "Majid" }];

    //act
    renderWithRedux(
      <Management
        location={{ pathname: "/invited" }}
        error={false}
        loadingInvitedTradies={false}
        invitedTradies={invitedTradies}
        accpetedTradies={accpetedTradies}
        loadingAcceptedTradies={false}
        accpetedCount={0}
        invitedCount={0}
        defaultTab="Invited"
      />
    );

    //assert
    expect(screen.getByText("Alex")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getAllByRole("tab")[0].classList).toContain(
      "tab-list-active"
    );
  });

  it("Click on a Tab change the list", async () => {
    //arrage
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    const invitedTradies = [{ id: 1, contactFirstName: "Alex" }];
    const accpetedTradies = [{ id: 2, contactFirstName: "Majid" }];

    //act
    renderWithRedux(
      <Router history={historyMock}>
        <Management
          location={{ pathname: "/invited" }}
          error={false}
          loadingInvitedTradies={false}
          invitedTradies={invitedTradies}
          accpetedTradies={accpetedTradies}
          loadingAcceptedTradies={false}
          accpetedCount={0}
          invitedCount={0}
          defaultTab="Accepted"
        />
      </Router>
    );
    fireEvent.click(screen.getByText("Accepted (0)"));

    //assert
    expect(screen.getByText("Majid")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getAllByRole("tab")[1].classList).toContain(
      "tab-list-active"
    );
  });

  it("Empty invitedTradies renders <Empty />", async () => {
    //arrage
    const invitedTradies = [];
    const accpetedTradies = [{ id: 2, contactFirstName: "Majid" }];

    //act
    renderWithRedux(
        <Management
          location={{ pathname: "/invited" }}
          error={false}
          loadingInvitedTradies={false}
          invitedTradies={invitedTradies}
          accpetedTradies={accpetedTradies}
          loadingAcceptedTradies={false}
          accpetedCount={0}
          invitedCount={0}
          defaultTab="Invited"
        />
    );
    
    //assert
    expect(screen.getByText("There is no item to display... 🤷🏻")).toBeInTheDocument();
  });

  it("Empty accpetedTradies renders <Empty />", async () => {
    //arrage
    const invitedTradies = [{ id: 2, contactFirstName: "Majid" }];
    const accpetedTradies = [];

    //act
    renderWithRedux(
        <Management
          location={{ pathname: "/accepted" }}
          error={false}
          loadingInvitedTradies={false}
          invitedTradies={invitedTradies}
          accpetedTradies={accpetedTradies}
          loadingAcceptedTradies={false}
          accpetedCount={0}
          invitedCount={0}
          defaultTab="Accepted"
        />
    );
    
    //assert
    expect(screen.getByText("There is no item to display... 🤷🏻")).toBeInTheDocument();
  });

  it("loading invitedTradies renders <Loader />", async () => {
    //arrage
    const invitedTradies = [{ id: 1, contactFirstName: "Alex" }];
    const accpetedTradies = [{ id: 2, contactFirstName: "Majid" }];

    //act
    renderWithRedux(
        <Management
          location={{ pathname: "/invited" }}
          error={false}
          loadingInvitedTradies={true}
          invitedTradies={invitedTradies}
          accpetedTradies={accpetedTradies}
          loadingAcceptedTradies={false}
          accpetedCount={0}
          invitedCount={0}
          defaultTab="Invited"
        />
    );
    
    //assert
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("loading accpetedTradies renders <Loader />", async () => {
    //arrage
    const invitedTradies = [{ id: 1, contactFirstName: "Alex" }];
    const accpetedTradies = [{ id: 2, contactFirstName: "Majid" }];

    //act
    renderWithRedux(
        <Management
          location={{ pathname: "/accepted" }}
          error={false}
          loadingInvitedTradies={false}
          invitedTradies={invitedTradies}
          accpetedTradies={accpetedTradies}
          loadingAcceptedTradies={true}
          accpetedCount={0}
          invitedCount={0}
          defaultTab="Accepted"
        />
    );
    
    //assert
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

});
