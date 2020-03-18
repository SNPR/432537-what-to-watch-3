import Namespace from "../namespace";

export const getAuthorizationStatus = (state) => {
  return state[Namespace.USER].authorizationStatus;
};

export const getAvatarUrl = (state) => {
  return state[Namespace.USER].avatarUrl;
};
