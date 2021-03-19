const config = {};

config.app = {};
config.app.leadManagementProviderBaseUrl =
  "http://localhost:5000/api/v1/";
config.socket = {
  url: "http://localhost:5000/leadHub",
  notifyLeadChangesEventName: "NotifyLeadChanges",
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { get: () => Object.freeze(config) };
