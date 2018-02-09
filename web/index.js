/* Author: Braden Shill"

Simple Static HTTP server. Servers everything in the /public folder
To run:
    node index.js

** make sure that all dependancies are installed first

*/


let express = require("express");

let app = express();

app.use("/",express.static("public"))

app.listen(8080,()=>{
    console.log("listening on port 8080");
})
