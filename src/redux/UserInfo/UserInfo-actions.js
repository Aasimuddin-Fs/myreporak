export const setUserInfo = (ActionType, Payload) => {
  return {
    type: ActionType,
    payload: Payload,
  };
};
export const getUserInfoFailed = (ActionType, Payload) => {
  return {
    type: ActionType,
    payload: Payload,
  };
};

export const Reset_UserInfo = ActionType => {
  return {
    type: ActionType,
  };
};
