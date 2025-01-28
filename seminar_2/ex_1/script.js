const menu = document.querySelector(".menu");
const buttons = menu.querySelectorAll(".menuButton");

buttons.forEach((element) => {
    element.addEventListener("mouseover", function (e) {
        element.classList.add("hover");
    });
    element.addEventListener("mouseout", function (e) {
        element.classList.remove("hover");
    });
});

buttons.forEach((element) => {
    element.addEventListener("click", function (event) {
        buttons.forEach((element) => {
            element.classList.remove("click");
        });
        element.classList.add("click");
    });
});
