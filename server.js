const express = require("express")
const hbs = require("hbs")
const fs = require("fs")

let app = express()


hbs.registerPartials(__dirname + "/views/partials")
app.set("view engine", "hbs")


app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile("server.log", log + "\n", (err) => {
        if(err){
            console.log("Unable to append to server.log.")
        }
    })

    next()
})

// app.use((req, res, next) => {
//     res.render("maintience.hbs", {
//         pageTitle: "We will be right back",
//         message: "We are undergoing maintience."
//     })
// })

app.use(express.static(__dirname + "/public"))



hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear()
})

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase()
})

app.get("/", (req, res) => {
    res.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Fullstack Javascript developer, musician, BJJ enthusiast"


    })
    
})

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page"
        
    })
})


app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Error: data is bad!"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
}); 