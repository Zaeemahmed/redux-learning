const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const applyMiddleWare = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
    payload: "buy cake",
  };
}

function buyIcream() {
  return {
    type: BUY_ICECREAM,
    payload: "buy icecream",
  };
}

const initialCakeState = {
  numCakes: 10,
  numIceCreams: 20,
};

const initialIcecreamState = {
  numIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numCakes: state.numCakes - 1,
      };
    default:
      return state;
  }
};
const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numIceCreams: state.numIceCreams - 1,
      };
    default:
      return state;
  }
};

const rootReducer = redux.combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

const store = createStore(rootReducer, applyMiddleWare(logger));

console.log(store.getState());
const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake());
store.dispatch(buyIcream());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcream());

unsubscribe();
