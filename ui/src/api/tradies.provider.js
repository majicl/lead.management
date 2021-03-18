import config from "../config.js";

const appConfig = config.get().app;

export const getInvited = async () => {
  const response = await fetch(
    `${appConfig.leadManagementProviderBaseUrl}lead/invited`
  );
  return response.json();
};

export const getAccepted = async () => {
  const response = await fetch(
    `${appConfig.leadManagementProviderBaseUrl}lead/accepted`
  );
  return response.json();
};

export const acceptTradieById = async (tradieId) => {
  const response = await fetch(
    `${appConfig.leadManagementProviderBaseUrl}lead/accept/${tradieId}`,
    {
      method: "PUT",
    }
  );
  return response.json();
};

export const declineTradieById = async (tradieId) => {
  const response = await fetch(
    `${appConfig.leadManagementProviderBaseUrl}lead/decline/${tradieId}`,
    {
      method: "PUT",
    }
  );
  return response.json();
};
