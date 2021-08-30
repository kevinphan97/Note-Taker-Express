const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

require("./routes/routes")(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log("Application is listening on PORT: " + PORT);
});