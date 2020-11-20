const express = require('express')
const app = express()

const IP = process.env.IP || '0.0.0.0'
const PORT = process.env.PORT || 5000

const VALID_PLANET_NAMES = [
    "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"
]

app.engine("html", require("ejs").renderFile)
app.use(express.static("public"))

// routes
app.get("/", function (req, res) {
    res.render("index.html")
})

app.get("/mercury", function(req, res) {
    res.render(`mercury.html`, {planetName: 'Mercury'})
})

app.get("/venus", function(req, res) {
    res.render(`venus.html`, {planetName: 'Venus'})
})

app.get("/earth", function(req, res) {
    res.render(`earth.html`, {planetName: 'Earth'})
})

// the rest of the planets, "5th" route for rubric
app.get("/:planet", function(req, res) {
    if (VALID_PLANET_NAMES.includes(req.params.planet)) {
        // capitalize planet name
        let planetName = req.params.planet.charAt(0).toUpperCase() + req.params.planet.slice(1)
        res.render(`${req.params.planet}.html`, {planetName: planetName})
    } else {
        res.sendStatus(404)
    }
})

// starting server
app.listen(PORT, IP, function () {
    console.log("Express server is running at " + IP + ":" + PORT)
})