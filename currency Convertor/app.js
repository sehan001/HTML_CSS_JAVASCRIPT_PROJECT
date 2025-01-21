const baseURL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdown) {
  for (let curcode in countryList) {
    let newopt = document.createElement("option");
    newopt.innerText = curcode;
    newopt.value = curcode;
    if (select.name === "from" && curcode === "USD") {
      newopt.selected = "selected";
    } else if (select.name === "to" && curcode === "INR") {
      newopt.selected = "selected";
    }
    select.append(newopt);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  let curcode = element.value;
  let countrycode = countryList[curcode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amt = document.querySelector(".amount input");
  let amtval = amt.value;
  if (amtval === "" || amtval < 0) {
    amtval = 1;
    amt.value = "1";
  }
  const url = `${baseURL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;

  let response = await fetch(url);
  let data = await response.json();
  let rate = data[tocurr.value.toLowerCase()];
  let finalamount = amtval * rate;
  msg.innerText = `${amtval} ${fromcurr.value}=${finalamount}${tocurr.value}`;
});
