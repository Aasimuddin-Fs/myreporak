export const Get_Login_Success = (ActionType, Payload) => {
  return {
    type: ActionType,
    payload: Payload,
  };
};

export const Get_Login_Failed = (ActionType, Payload) => {
  return {
    type: ActionType,
    payload: Payload,
  };
};

export const Reset_Login_State = (ActionType) => {
  return {
    type: ActionType,
  };
};
