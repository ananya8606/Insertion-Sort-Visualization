const wrapper = document.querySelector(".main-container"),
  input_box = wrapper.querySelector("#input-box");
let addBtn = document.getElementById("add-btn");
let sortBtn = document.getElementById("sort-btn");
let resetBtn = document.getElementById("reset-btn");
let input_section = document.querySelector(".input-section");
let output_section = document.querySelector(".output-section");
let array = [];

function addNumber() {
  let getData = input_box.value;
  getData = parseInt(getData);
  if (!Number.isNaN(getData)) {
    let box = document.createElement("div");
    box.appendChild(document.createTextNode(getData));
    box.setAttribute("class", "box");
    document.querySelector(".input-section").appendChild(box);
    array.push(getData);
  }
  console.log(array);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
sortBtn.addEventListener("click", async () => {
  show_Array(array);
  for (let i = 1; i < array.length; i++) {
    let box1 = output_section.querySelector(".step_container");
    modify_Array(array, box1);
    let box = output_section.querySelector(".step_container");
    let array_element = box.getElementsByClassName("box");
    var pos1 = array_element[0].offsetLeft;
    var pos2 = array_element[1].offsetLeft;
    var distance = pos1 - pos2;
    await sleep(500);
    let key = parseInt(array_element[i].textContent);
    array_element[i].classList.add("key-element");
    await Target_leftArray(i, array_element, true);
    await moveup(array_element[i]);
    let j = i - 1;
    while (j >= 0 && parseInt(array_element[j].textContent) > key) {
      await Element_Shifting(array_element[j], distance);
      array[j + 1] = array[j];
      await sleep(2000);
      j = j - 1;
    }
    await insertKey(i, j + 1, key);
    array[j + 1] = key;
    await Target_leftArray(i, array_element, false);
    array_element[i].classList.remove("key-element");
  }
});

function show_Array(array) {
  let step_container = document.createElement("div");
  step_container.setAttribute("class", "step_container");
  for (let i = 0; i < array.length; i++) {
    let box = document.createElement("div");
    box.appendChild(document.createTextNode(array[i]));
    box.setAttribute("class", "box");
    step_container.appendChild(box);
  }
  output_section.appendChild(step_container);
}

function modify_Array(array, replace) {
  let step_container = document.createElement("div");
  step_container.setAttribute("class", "step_container");
  for (let i = 0; i < array.length; i++) {
    let box = document.createElement("div");
    box.appendChild(document.createTextNode(array[i]));
    box.setAttribute("class", "box");
    step_container.appendChild(box);
  }
  output_section.replaceChild(step_container, replace);
}

async function insertKey(index, pos, key) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let box = output_section.querySelector(".step_container");
      let array_element = box.getElementsByClassName("box");
      let position_1 = array_element[pos].offsetLeft;
      let position_2 = array_element[index].offsetLeft;
      let gap_distance = position_2 - position_1;
      array_element[
        index
      ].style.transform = `translate(-${gap_distance}px,-100px)`;
      setTimeout(() => {
        array_element[index].style.transform = `translateX(-${gap_distance}px)`;
      }, 1000);
      setTimeout(() => {
        array_element[pos].style.backgroundColor = "purple";
        resolve();
      }, 1000);
    }, 1000);
  }, 1000);
}

async function Target_leftArray(index, array_element, situation) {
  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < index; i++) {
        if (situation === true) {
          array_element[i].classList.add("target_elements");
        } else {
          array_element[i].classList.remove("target_elements");
        }
      }
      resolve();
    }, 1000);
  });
}

function Element_Shifting(element, distance) {
  return new Promise((resolve) => {
    element.style.backgroundColor = "#e6852c";
    element.style.transform = `translateX(${-1 * distance}px)`;
    element.style.transition = "1000ms ease-in-out";
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

async function moveup(element) {
  return new Promise((resolve) => {
    element.style.transform = "translateY(-100px)";
    element.style.transition = "1000ms ease-in-out";
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

function resetData() {
  input_section.innerHTML = "";
  output_section.innerHTML = "";
}
