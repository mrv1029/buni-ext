// document.addEventListener("DOMContentLoaded", function (event) {
//   alert("saa11s");
// });
// var button = document.getElementsByClassName(
//   "selected-trainer-image-wrapper"
// )[0];
// console.log(button);
// button.addEventListener("click", (event) => {
//   var button1 = document.getElementsByClassName("trainer-option-wraper")[0];
  
//   console.log("12312");
//   console.log(button1);
//   if (button1 != null) {
//     button1.addEventListener("click", (event) => {
//       console.log("12312");
//     });
//   }
// });
alert("saa11s");
var btn = document.querySelectorAll('.selected-trainer-image-wrapper .selected-trainner-image')[0]
btn.addEventListener('load', function () {
  alert("123123");
});
console.log(btn);
// setInterval(function () {
//   if (
//     !document
//       .getElementsByClassName('selected-trainner-image')[0]
//       .src.endsWith("empty-trainer.png") &&
//     !document
//       .getElementsByClassName('selected-trainner-image')[0]
//       .src.endsWith("empty_bunicorn.png")
//   )
//     calculations();
// }, 50000); // Wait 1000ms before running again

function calculations() {
  let r = /\d+/;
  let trainer = "selected-trainner-image";
  let lvl = "level-selected-trainer";
  let power = "power-selected-trainer";
  let bunicorn = "selected-trainner-image";
  let bunicornPwr = "info-selected-bunicorn";

  if (
    !document
      .getElementsByClassName(trainer)[0]
      .src.endsWith("empty-trainer.png") &&
    !document
      .getElementsByClassName(bunicorn)[0]
      .src.endsWith("empty_bunicorn.png")
  ) {
    document
      .getElementsByClassName(trainer)[0]
      .addEventListener("click", function () {
        alert("Hello World!");
      });
    //1. Trainer (
    //Level
    let lvlTrainer = document
      .getElementsByClassName(lvl)[0]
      .textContent.match(r)[0];

    //Power
    let pwrTrainer = document
      .getElementsByClassName(power)[0]
      .textContent.match(r)[0];

    console.log("trainer power: " + pwrTrainer);
    //Element
    let elementTrainer = getElementObject(
      document.getElementsByClassName(trainer)[0].src
    );
    console.log("trainer element: " + elementTrainer);

    //2. bunicorn
    //Element bunicorn
    let elementbunicorn = getElementObject(
      document.getElementsByClassName(bunicorn)[0].src
    );
    console.log("bunicorn element: " + elementbunicorn);

    //Star
    let star = document.querySelectorAll(
      ".battle-container-fight .team-wrapper .bunicorn .selected-trainer-image-wrapper"
    )[0].children[0].src;
    let bunicornStar = star.split("/").pop().split("_")[2];
    console.log("Star: " + bunicornStar);

    //Pwr bunicorn
    let elementPwr = document.getElementsByClassName(bunicornPwr);
    //info-right
    let pwrbunicorn = getbunicornBonus(
      elementPwr[0].children[1],
      elementTrainer
    );
    console.log("power bunicorn: " + pwrbunicorn);

    //3. playerBasePower
    let playerBasePower = pwrTrainer * pwrbunicorn;
    console.log("power player:" + playerBasePower);

    //4. Append power
    Append(playerBasePower, elementbunicorn, elementTrainer, bunicornStar);

    getBURPrice();
  }
}

function elementBonus(trainerElement, bunicornElement, enemyElement) {
  let TraitBonus = 1;
  let bonus = 0.052;
  if (trainerElement == bunicornElement) {
    TraitBonus += bonus;
  }
  if (trainerElement == "fire" && enemyElement == "earth") {
    TraitBonus += bonus;
  }
  if (trainerElement == "fire" && enemyElement == "water") {
    TraitBonus -= bonus;
  }
  if (trainerElement == "earth" && enemyElement == "air") {
    TraitBonus += bonus;
  }
  if (trainerElement == "earth" && enemyElement == "fire") {
    TraitBonus -= bonus;
  }
  if (trainerElement == "air" && enemyElement == "water") {
    TraitBonus += bonus;
  }
  if (trainerElement == "air" && enemyElement == "earth") {
    TraitBonus -= bonus;
  }
  if (trainerElement == "water" && enemyElement == "fire") {
    TraitBonus += bonus;
  }
  if (trainerElement == "water" && enemyElement == "air") {
    TraitBonus -= bonus;
  }
  return TraitBonus;
}

function getElementObject(scr) {
  let element = ["fire", "earth", "air", "water"];
  let text = scr.split("_");
  console.log(text);
  const found = text.find((r) => element.includes(r));
  return found;
}

function getbunicornBonus(elementbunicorn, elementTrainer) {
  let sameElement = 1.15;
  let otherElement = 1;
  let bonus = 1.07;
  let neutral = 1.07;
  let baseline = 500;

  let Arr = [];
  console.log(elementbunicorn.childNodes.length);
  console.log(elementbunicorn.childNodes);
  for (let i = 0; i < elementbunicorn.childNodes.length; i++) {
    if (elementbunicorn.children[i]) {
      console.log(elementbunicorn.children[i].innerText);
      Arr.push(
        elementbunicorn.children[i].innerText
          .toLowerCase()
          .match(/[a-zA-Z]+/g) +
          "_" +
          elementbunicorn.children[i].innerText.match(/\d+/)
      );
    }
  }
  let pwrbunicorn = 0;
  console.log(Arr);
  Arr.forEach((item) => {
    let element = item.split("_")[0];
    let pwr = item.split("_")[1];
    console.log(pwr);
    if (element == "neutral") pwrbunicorn += pwr * neutral;
    else if (element == "bonus attr") pwrbunicorn += pwr * bonus;
    if (element == elementTrainer) pwrbunicorn += pwr * sameElement;
    else pwrbunicorn += pwr * otherElement;
    console.log(pwrbunicorn);
  });
  return 1 + pwrbunicorn / baseline;
}

function Append(trainerPwr, elementbunicorn, elementTrainer, bunicornStar) {
  let lstEnemyPwr = document.querySelectorAll(".list-enemies");

  lstEnemyPwr.forEach(function (element) {
    //console.log(element.querySelector("encounter"));
    //console.log(element.childNodes.length);
    for (let i = 0; i < element.childNodes.length; i++) {
      let p = document.getElementById("new" + i);
      console.log(p);
      if (p != null) element.childNodes[i].removeChild(p);

      //power
      let pwrEnemy = element.childNodes[i].lastChild
        .querySelectorAll(
          ".encounter-container .battle-enemy-info .encounter-power"
        )[0]
        .lastChild.innerText.match(/\d+/);

      //element
      let elementEnemy = element.childNodes[i].lastChild
        .querySelectorAll(".encounter-container .battle-enemy-info")[0]
        .children[0].className.replace("enemy-element", "")
        .replace("circle-element", "")
        .split("-")[0]
        .trim()
        .toLowerCase();

      //final pwr
      let traitBonus = elementBonus(
        elementTrainer,
        elementbunicorn,
        elementEnemy
      );
      let finalPwr = trainerPwr * traitBonus;
      console.log(finalPwr);

      //reward
      let rw = rewardUSD(pwrEnemy, bunicornStar);

      //win rate
      let winrate = winRateCalc(
        parseInt(finalPwr * 0.9),
        parseInt(finalPwr * 1.1),
        parseInt(pwrEnemy * 0.9),
        parseInt(pwrEnemy * 1.1)
      );

      let d = document.createElement("div");
      let color = winrate < 90 ? "red" : "yellow";
      d.id = "new" + i;
      d.innerHTML = `<div class="enemy_info" style="width: 248px; font-size: 12pt">
      <div>Enemy: ${parseInt(pwrEnemy * 0.9)} ~ ${parseInt(pwrEnemy * 1.1)}<div>
      <div>Your: ${parseInt(finalPwr * 0.9)} ~ ${parseInt(finalPwr * 1.1)}<div>
      <div><span style="color: ${color}; !important;font-weight: bold;">Win: ${parseInt(
        winrate
      )}%</span><div>
      <div>Reward (~$${rw}): </div>
  </div>`;
      element.childNodes[i].prepend(d);
    }
  });
}

function rewardUSD(enemyPower, bunicorn_star) {
  //reward_gas_offset = 0.5 (USD)
  //reward_baseline = 0.4 (USD)
  enemyPower = parseInt(enemyPower);
  const reward_gas_offset = 0.5;
  const reward_baseline = 0.5;
  let reward_multiplier = Math.sqrt((enemyPower / 1000) * bunicorn_star);
  let reward = reward_gas_offset + reward_baseline * reward_multiplier;
  return reward.toFixed(2);
}

function winRateCalc(minYourPower, maxYourPower, minEnemyPower, maxEnemyPower) {
  let minimumPower = Math.min(
    minYourPower,
    maxYourPower,
    minEnemyPower,
    maxEnemyPower
  );
  let maximumPower = Math.max(
    minYourPower,
    maxYourPower,
    minEnemyPower,
    maxEnemyPower
  );
  let totalCount = maximumPower - minimumPower + 1;
  let match = 0;
  for (let e = minEnemyPower; e <= maxEnemyPower; e++) {
    for (let a = minYourPower; a <= maxYourPower; a++) {
      if (a == e) {
        match++;
      }
    }
  }
  let mR = match / totalCount;
  let diff1 = minYourPower - minEnemyPower;
  let diff2 = maxYourPower - maxEnemyPower;
  let diff1R = diff1 / totalCount;
  let diff2R = diff2 / totalCount;
  let rate = diff1R + diff2R + mR / 2;
  if (rate <= 0) {
    return 0;
  } else {
    return rate * 100;
  }
}

function getBURPrice() {
  console.log("abc");
  // axios({
  //   method: "get",
  //   url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=11383",
  //   headers: {
  //     "X-CMC_PRO_API_KEY": "28537b29-294e-4579-9b4a-eba82aef3e61",
  //     Accepts: "application/json",
  //   },
  //   mode: "no-cors",
  // }).then(function (response) {
  //   console.log(response.data);
  //   console.log(response.status);
  //   console.log(response.statusText);
  //   console.log(response.headers);
  //   console.log(response.config);
  // });

  // fetch(
  //   "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=11383",
  //   {
  //     method: "GET", // or 'PUT'
  //     headers: {
  //       "X-CMC_PRO_API_KEY": "28537b29-294e-4579-9b4a-eba82aef3e61",
  //       Accepts: "application/json",
  //     },
  //     mode: 'no-cors'
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Success:", data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
}
