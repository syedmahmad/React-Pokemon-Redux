//reducer are pure function
const initialState = { data: null };
const getData = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHDATA_SUCCESS":
      return { ...state, data: action.payload };
    case "FETCHDATA_FAILURE":
      console.log("Action payload", action.payload.error);
      return { ...state, data: {} };
    case "SET_ABILITIES":
      return { ...state, data: action.payload };
    case "SET_SPECIES":
      return { ...state, data: action.payload };
    case 'SET_EVOLS_FROM':
      return { ...state, data: action.payload };
    case "SET_OFFSET":
      return { ...state, data: action.payload };
    case "SELECT_PAGE":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
export default getData;
