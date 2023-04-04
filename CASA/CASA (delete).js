// // opens up landing page
// app.get("/", function (req, res) {
//     let doc = fs.readFileSync("./app./app/html/login.html", "utf8"); 
//     res.send(doc);
// });

// // opens up alerts page
// app.get("alerts", function (req, res) {
//     let doc = fs.readFileSync("./app./app/html/alerts.html", "utf8"); 
//     res.send(doc);
// });

// // opens up profile page
// app.get("/profile.html", function (req, res) {
//     let doc = fs.readFileSync("./app./app/html/profile.html", "utf8"); 
//     res.send(doc);
// });

// // opens up profile page
// app.get("/login.html", function (req, res) {
//     let doc = fs.readFileSync("./app./app/html/login.html", "utf8"); 
//     res.send(doc);
// });

// // opens up profile page
// app.get("/signup.html", function (req, res) {
//     let doc = fs.readFileSync("./app./app/html/signup.html", "utf8"); 
//     res.send(doc);
// });

// // opens up profile page
// app.get("/reset.html", function (req, res) {
//     let doc = fs.readFileSync("./app./app/html/reset.html", "utf8"); 
//     res.send(doc);
// });

// app.get("/tradeReg.html", function (req, res) {
//     let doc = fs.readFileSync("./app./app/html/tradeReg.html", "utf8"); 
//     res.send(doc);
// });


// // for resource not found (i.e., 404)
// app.use(function (req, res, next) {
//     // this could be a separate file too - but you'd have to make sure that you have the path
//     // correct, otherewise, you'd get a 404 on the 404 (actually a 500 on the 404)
//     res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body><./app/html>");
// });

