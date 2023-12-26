// get dom elements
const matchContainerEl = document.getElementById("match-container");
const addMatchBtn = document.getElementById("add-match");
const numberEl = document.getElementsByClassName("number");
const incrementFormEl = document.getElementsByClassName("incrementForm");
const incrementFormArray = Array.from(incrementFormEl);
const decrementFormEl = document.getElementsByClassName("decrementForm");
const decrementFormArray = Array.from(decrementFormEl);

//initial state
const initialState = [
  {
    id: 0,
    value: 110,
  },
];

//action creator
const increment = (value, id) => {
  return { type: "increment", payload: { value, id } };
};
const decrement = (value, id) => {
  return { type: "decrement", payload: { value, id } };
};

//reducer function
const matchTotalReducer = (state = initialState, action) => {
  if (action.type == "addNewField") {
    return [
      ...state,
      { id: state.length, value: state[0].value + state.length },
    ];
  } else if (action.type == "increment") {
    // console.log("inc", state, action);
    const newState = state.map((element) => {
      if (element.id == action.payload.id) {
        return { ...element, value: 10 };
      }
      return { ...element };
    });
    console.log(newState);
    return newState;
  } else if (action.type == "decrement") {
    // console.log("dec");
    const newState = state.map((element) => {
      if (element.id == action.payload.id) {
        return { ...element, value: 20 };
      }
      return { ...element };
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
  console.log("state", state);
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
      //   console.log(e.target.increment.value);
      store.dispatch(increment(10, i));
    });
  });
  //get new added element and add event listener for decrement form
  const newDecrementFormEl = document.querySelectorAll(".decrementForm");
  const newDecrementFormArray = Array.from(newDecrementFormEl);
  newDecrementFormArray.forEach((element, i) => {
    element.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      //   console.log(e.target.decrement.value);
      store.dispatch(decrement(5, i));
    });
  });
  store.dispatch({
    type: "addNewField",
  });
  //   const newNumberEl = document.getElementsByClassName("number");
  //   const newNumberElArray = Array.from(newNumberEl);
  //   console.log(newNumberElArray);
});
//event listener for initial increment form
incrementFormArray.forEach((element) => {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    // console.log(e.target.increment.value);
    store.dispatch(increment(10, 0));
  });
});
//event listener for initial decrement form
decrementFormArray.forEach((element) => {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    // console.log(e.target.decrement.value);
    store.dispatch(decrement(5, 0));
  });
});
