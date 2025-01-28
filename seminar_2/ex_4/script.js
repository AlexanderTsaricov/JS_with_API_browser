const box_1 = document.querySelector(".question_1");
const box_2 = document.querySelector(".question_2");
const button = document.querySelector(".submit");
const answerBox = document.querySelector(".result");

button.addEventListener("click", function (e) {
    const answer_1 = box_1.querySelector('input[name="question_1"]:checked');
    const answer_2 = box_2.querySelector('input[name="question_2"]:checked');

    if (answer_1 && answer_2) {
        answerBox.innerHTML = `<p>your answer: ${answer_1.parentElement.textContent} and ${answer_2.parentElement.textContent}</p>`;
    } else {
        answerBox.innerHTML = "<p>Your must answer to all</p>";
    }
});
