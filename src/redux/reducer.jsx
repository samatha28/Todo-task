
const initialState = 5;

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "Increment":
      return state + 1;
    case "Decrement":
      return state - 1;
    default:
      return state;
  }
}
