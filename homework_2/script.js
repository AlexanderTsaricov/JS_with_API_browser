const picSrc = ["cat_1.jpg", "cat_2.jpg", "cat_3.jpg"];
let index = 0;
const img = document.querySelector(".pics");
const navcircleBox = document.querySelector(".navCircleBox");

const buttonLast = document.querySelector(".last");
const buttonNext = document.querySelector(".next");

for (let index = 0; index < picSrc.length; index++) {
    const circle = document.createElement("input");
    circle.type = "radio";
    circle.name = "pic";
    circle.value = picSrc[index];
    circle.classList.add("circlButton");
    circle.id = index;
    navcircleBox.appendChild(circle);
}

const circleButtons = document.querySelectorAll(".circlButton");
circleButtons[0].checked = true;

navcircleBox.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT") {
        console.log(`click to ${e.target.value}`);
        img.src = `./pics/${e.target.value}`;
        index = parseInt(e.target.id);
    }
});

buttonLast.addEventListener("click", function (e) {
    if (index == 0) {
        index = picSrc.length - 1;
    } else {
        index -= 1;
    }
    circleButtons[index].checked = true;
    img.src = `./pics/${picSrc[index]}`;
});

buttonNext.addEventListener("click", function (e) {
    if (index == picSrc.length - 1) {
        index = 0;
    } else {
        index += 1;
    }
    circleButtons[index].checked = true;
    img.src = `./pics/${picSrc[index]}`;
});
