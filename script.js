// get dom elements
const matchContainerEl = document.getElementById("match-container");
const addMatchBtn = document.getElementById("add-match");
const resetEl = document.getElementById("reset");
const numberEl = document.getElementsByClassName("number");
const incrementFormEl = document.getElementsByClassName("incrementForm");
const incrementFormArray = Array.from(incrementFormEl);
const decrementFormEl = document.getElementsByClassName("decrementForm");
const decrementFormArray = Array.from(decrementFormEl);

//initial state
const initialState = [
  {
    id: 0,
    value: 120,
  },
];

//action identifier
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADDNEWFIELD = "addNewField";
const RESET = "reset";

//action creator
const increment = (value, id) => {
  return { type: INCREMENT, payload: { value, id } };
};
const decrement = (value, id) => {
  return { type: DECREMENT, payload: { value, id } };
};

//reducer function
const matchTotalReducer = (state = initialState, action) => {
  if (action.type == ADDNEWFIELD) {
    return [...state, { id: state.length, value: 120 }];
  } else if (action.type == INCREMENT) {
    const newState = state.map((element) => {
      if (element.id == action.payload.id) {
        return { ...element, value: element.value + action.payload.value };
      }
      return { ...element };
    });
    return newState;
  } else if (action.type == DECREMENT) {
    const newState = state.map((element) => {
      if (element.id == action.payload.id) {
        return {
          ...element,
          value:
            element.value < action.payload.value
              ? 0
              : element.value - action.payload.value,
        };
      }
      return { ...element };
    });
    return newState;
  } else if (action.type == RESET) {
    const newState = state.map((element) => {
      return { ...element, value: 120 };
    });
    return newState;
  } else {
    return [...state];
  }
};

//create store
const store = Redux.createStore(matchTotalReducer);

//render function
const render = () => {
  const state = store.getState();
  const numberElArray = Array.from(numberEl);
  numberElArray.forEach((element, i) => {
    element.innerText = state[i].value;
  });
};
render();

//subscribe to store
store.subscribe(render);

//event listener
addMatchBtn.addEventListener("click", () => {
  //match row html, create div element, appendchild
  const counterHtml = `
  <div class="wrapper">
  <button class="lws-delete">
    <img src="./image/delete.svg" alt="" />
  </button>
  <h3 class="lws-matchName">Match 1</h3>
</div>
<div class="inc-dec">
  <form class="incrementForm">
    <h4>Increment</h4>
    <input type="number" name="increment" class="lws-increment" />
  </form>
  <form id="decrementForm" class="decrementForm">
    <h4>Decrement</h4>
    <input type="number" name="decrement" class="lws-decrement" />
  </form>
</div>
<div class="numbers">
  <h2 class="lws-singleResult number">120</h2>
</div>
  `;
  const counterContainer = document.createElement("div");
  counterContainer.classList.add("match");
  counterContainer.innerHTML = counterHtml;
  matchContainerEl.appendChild(counterContainer);
  //get new added element and add event listener for increment form
  const newIncrementFormEl = document.querySelectorAll(".incrementForm");
  const newIncrementFormArray = Array.from(newIncrementFormEl);
  newIncrementFormArray.forEach((element, i) => {
    element.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      store.dispatch(increment(parseInt(element.increment.value), i));
    });
  });
  //get new added element and add event listener for decrement form
  const newDecrementFormEl = document.querySelectorAll(".decrementForm");
  const newDecrementFormArray = Array.from(newDecrementFormEl);
  newDecrementFormArray.forEach((element, i) => {
    element.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      store.dispatch(decrement(parseInt(element.decrement.value), i));
    });
  });
  store.dispatch({
    type: ADDNEWFIELD,
  });
});
//event listener for initial increment form
incrementFormArray.forEach((element) => {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    store.dispatch(increment(parseInt(element.increment.value), 0));
  });
});
//event listener for initial decrement form
decrementFormArray.forEach((element) => {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    store.dispatch(decrement(parseInt(element.decrement.value), 0));
  });
});

resetEl.addEventListener("click", () => {
  store.dispatch({
    type: RESET,
  });
});
