import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public")); // http://localhost:3000/public/js/app.js 페이지 로딩

app.get("/", (req, res) => res.render("home"));
console.log("hello");

const handleListen = () => console.log(`Listening on http:localhost:3000`);
app.listen(3000, handleListen); // 포트 3000을 listen 해줄 것.