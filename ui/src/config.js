const config = {};

config.app = {};
config.app.leadManagementProviderBaseUrl =
  "https://localhost:5001/api/v1/";
config.socket = {
  url: "https://localhost:5001/leadHub",
  notifyLeadChangesEventName: "NotifyLeadChanges",
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { get: () => Object.freeze(config) };
