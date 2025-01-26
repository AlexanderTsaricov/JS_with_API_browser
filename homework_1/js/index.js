const buttons = document.querySelectorAll(".scheduleBox_button");
const cencelButtons = document.querySelectorAll(".scheduleBox_exitButton");

buttons.forEach((element) => {
    const parent = element.closest(".scheduleBox");
    const maxStudentsTag = parent.querySelector(".scheduleBox_maxSudents");
    const registratedStudentsTag = parent.querySelector(".scheduleBox_registredStudents");
    const inputTag = parent.querySelector(".scheduleBox_input");

    const max = parseInt(maxStudentsTag.getAttribute("data-max"));
    const registrated = parseInt(registratedStudentsTag.getAttribute("data-students"));

    if (registrated < max) {
        element.addEventListener("click", function () {
            const name = inputTag.value;
            if (!name || name.trim() === "") {
                alert("Please enter your name.");
                return;
            }
            console.log(inputTag);
            console.log(name);
            fetch(`/singUp/${element.id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name }),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("OK");
                        location.href = "/";
                    } else {
                        console.log("Not OK");
                    }
                })
                .catch((error) => {
                    alert("server error");
                    console.error(error);
                });
        });
    } else {
        element.className = "scheduleBox_button bg-secondary";
    }
});

cencelButtons.forEach((element) => {
    const parent = element.closest(".scheduleBox");
    const inputTag = parent.querySelector(".scheduleBox_input");
    element.addEventListener("click", function () {
        const name = inputTag.value;
        if (!name || name.trim() === "") {
            alert("Please enter your name.");
            return;
        }
        console.log(inputTag);
        console.log(name);
        fetch(`/cencel/${element.id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("OK");
                    location.href = "/";
                } else {
                    console.log("Not OK");
                }
            })
            .catch((error) => {
                alert("server error");
                console.error(error);
            });
    });
});
