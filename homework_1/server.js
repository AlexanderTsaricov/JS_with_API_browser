const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const port = 3000;
function loadschedule(callback) {
    fs.readFile("data/data.json", "utf-8", (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, JSON.parse(data));
        }
    });
}

function saveschedule(data, callback) {
    const jsonData = JSON.stringify(data);
    fs.writeFile("data/data.json", jsonData, "utf-8", (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, "style")));
app.use(express.static(path.join(__dirname, "templates")));
app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(path.join(__dirname, "data")));

app.use(express.json());

app.get("/", (req, res) => {
    fs.readFile("templates/scheduleBox.handlebars", "utf-8", (err, templateData) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        } else {
            loadschedule((err, scheduleData) => {
                if (err) {
                    res.status(500);
                    return res.send("Error");
                }
                console.log(scheduleData);
                const template = handlebars.compile(templateData);
                const html = template({ schedule: scheduleData.lections });
                res.send(html);
            });
        }
    });
});

app.put("/singUp/:id", (req, res) => {
    const name = req.body.name;
    console.log(req.body);
    if (name && name !== "") {
        loadschedule((err, scheduleData) => {
            if (err) {
                res.status(500);
                return res.send("Error");
            }
            const index = scheduleData.registratedStudents.findIndex((student) => student.name === name);
            if (index !== -1) {
                const hasLections = scheduleData.registratedStudents[index].lectionsId.includes(
                    parseInt(req.params.id)
                );
                if (!hasLections) {
                    scheduleData.registratedStudents[index].lectionsId.push(parseInt(req.params.id));
                    console.log(scheduleData.registratedStudents[index]);
                    const indexLection = scheduleData.lections.findIndex(
                        (lection) => lection.id === parseInt(req.params.id)
                    );
                    console.log(indexLection);
                    scheduleData.lections[indexLection].coutRegistred += 1;
                } else {
                    console.log("Студент уже записан");
                }
            } else {
                scheduleData.registratedStudents.push({ name: name, lectionsId: [parseInt(req.params.id)] });
                console.log(scheduleData.registratedStudents[index]);
                const indexLection = scheduleData.lections.findIndex(
                    (lection) => lection.id === parseInt(req.params.id)
                );
                console.log(indexLection);
                scheduleData.lections[indexLection].coutRegistred += 1;
            }
            saveschedule(scheduleData, (err) => {
                if (err) {
                    res.status(500).end();
                    console.error("Save error: ", err);
                } else {
                    console.log("Save sussful");
                    res.status(200).end();
                }
            });
        });
    } else {
        console.log("Name is null");
        res.status(500).end();
    }
});

app.put("/cencel/:id", (req, res) => {
    const name = req.body.name;
    console.log(req.body);
    if (name && name !== "") {
        loadschedule((err, scheduleData) => {
            if (err) {
                res.status(500);
                return res.send("Error");
            }
            const index = scheduleData.registratedStudents.findIndex((student) => student.name === name); // Ищем индекс студента
            if (index !== -1) {
                const hasLections = scheduleData.registratedStudents[index].lectionsId.includes(
                    parseInt(req.params.id)
                );
                if (hasLections) {
                    console.log(scheduleData.registratedStudents[index]);
                    const indexLection = scheduleData.lections.findIndex(
                        (lection) => lection.id === parseInt(req.params.id)
                    );
                    scheduleData.registratedStudents[index].lectionsId.splice(indexLection, 1);
                    console.log(indexLection);
                    scheduleData.lections[indexLection].coutRegistred -= 1;
                } else {
                    console.log("Студента уже нет в зписи на лекцию");
                }
            } else {
                console.log("Нет такого студента");
            }
            saveschedule(scheduleData, (err) => {
                if (err) {
                    res.status(500).end();
                    console.error("Save error: ", err);
                } else {
                    console.log("Save sussful");
                    res.status(200).end();
                }
            });
        });
    } else {
        console.log("Name is null");
        res.status(500).end();
    }
});

app.listen(port, () => {
    console.log("server start");
});
