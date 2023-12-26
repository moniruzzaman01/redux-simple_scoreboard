// get dom elements
const matchContainerEl = document.getElementById("match-container");
const addMatchBtn = document.getElementById("add-match");

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
    <form class="decrementForm">
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
});
