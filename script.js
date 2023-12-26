// get dom elements
const matchContainerEl = document.getElementById("match-container");
const matchEl = document.getElementsByClassName("match");
const addMatchBtn = document.getElementById("add-match");
const incrementFormEl = document.getElementsByClassName("incrementForm");
const incrementFormArray = Array.from(incrementFormEl);
const decrementFormEl = document.getElementsByClassName("decrementForm");
const decrementFormArray = Array.from(decrementFormEl);

//event listener
addMatchBtn.addEventListener("click", () => {
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
  <h2 class="lws-singleResult">120</h2>
</div>
  `;
  const counterContainer = document.createElement("div");
  counterContainer.classList.add("match");
  counterContainer.innerHTML = counterHtml;
  matchContainerEl.appendChild(counterContainer);
  const newIncrementFormEl = document.querySelectorAll(".incrementForm");
  const newIncrementFormArray = Array.from(newIncrementFormEl);
  newIncrementFormArray.forEach((element) => {
    element.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(e.target.increment.value);
    });
  });
  const newDecrementFormEl = document.querySelectorAll(".decrementForm");
  const newDecrementFormArray = Array.from(newDecrementFormEl);
  newDecrementFormArray.forEach((element) => {
    element.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(e.target.decrement.value);
    });
  });
});

incrementFormArray.forEach((element) => {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.increment.value);
  });
});
decrementFormArray.forEach((element) => {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.decrement.value);
  });
});
