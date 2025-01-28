const openButton = document.querySelector(".openModal");
const modalWindow = document.querySelector(".modalWindow");
const closeButton = document.querySelector(".modalwindow_closeButton");

openButton.addEventListener("click", (event) => {
    modalWindow.style.visibility = "visible";
});

closeButton.addEventListener("click", (event) => {
    modalWindow.style.visibility = "hidden";
});
