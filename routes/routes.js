const fs = require("fs");
const path = require("path");

module.exports = app => {
    
    fs.readFile("./db/db.json", "utf-8", (err,data) => {
        if (err) throw err;

        let notes = JSON.parse(data);

        function updateData() {
            fs.writeFile("./db/db.json", JSON.stringify(notes), err => {
                if (err) throw err;
                return true;
            });
        };

    app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

    app.get("/api/notes/:id", function(req, res) {
            res.json(notes[req.params.id]);
        });

    app.post("/api/notes", function(req, res) {
            let newNote = req.body;
            let id = notes.length;
            newNote.id = id + 1;
            notes.push(newNote);
            updateData(notes);
            res.json(notes);
        });

    app.get("/notes", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        app.get("*", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
    });
};