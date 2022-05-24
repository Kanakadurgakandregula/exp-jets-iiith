"use strict";
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const arrayRemove = (arr, value) => {
  return arr.filter(function (ele) {
    return ele != value;
  });
};

const ids = ["tube-start", "tube-end", "tube-top"];

const asyncMove = async (id, curPosition = 0, finalPosition = 1) => {
  let path = document.getElementById(id);
  while (true) {
    let animation_speed = document.getElementById("water-flow").value;
    animation_speed = animation_speed * 0.0001;
    animation_speed = animation_speed == 0 ? 0.0001 : animation_speed;
    if (curPosition > finalPosition) break;
    curPosition += animation_speed;
    path.setAttribute("offset", curPosition);
    await sleep(0.5);
  }
};

const animation = async () => {
  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    let path = document.getElementById(id);
    let finalPosition = 1;
    let curPosition = 0;
    while (true) {
      let animation_speed = document.getElementById("water-flow").value;
      animation_speed = animation_speed * 0.0001;
      animation_speed = animation_speed == 0 ? 0.0001 : animation_speed;
      if (curPosition > finalPosition) break;
      curPosition += animation_speed;
      path.setAttribute("offset", curPosition);
      await sleep(2);
    }
  }
  document.getElementById("drops").setAttribute("offset", 1);
  document.getElementById("scale_up").setAttribute("offset", 1);
  document.getElementById("scale_down").setAttribute("offset", 0);
};

const resetEverything = () => {
  const tube_ids = ["drops"];
  tube_ids.forEach((element) => {
    let path = document.getElementById(element);
    path.setAttribute("offset", 0);
  });
  ids.forEach((ele) => {
    let path = document.getElementById(ele);
    path.setAttribute("offset", 0);
  });
  document.getElementById("scale_up").setAttribute("offset", 0);
  document.getElementById("scale_down").setAttribute("offset", 1);
};

const startAnimation = async () => {
  resetEverything();
  document.getElementById("startbutton").disabled = true;
  document.getElementById("resetbutton").disabled = true;
  await animation();
  document.getElementById("startbutton").disabled = false;
  document.getElementById("resetbutton").disabled = false;
};

resetEverything();