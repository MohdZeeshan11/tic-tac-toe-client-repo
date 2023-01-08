import { ADD_USER } from '../actionTypes';

const userData = (state = {}, action) => {
    console.log("payloadData = ",action.payload);
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userData;
