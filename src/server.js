import express from "express";
import WebSocket from "ws";
import http from "http";

const app = express();

app.set("view engine", "pug"); // pug로 view engine을 설정
app.set("views", __dirname + "/views"); // Express에 template이 어디 있는지 지정

// public url을 생성해서 유저에게 파일을 공유
// User가 볼 수 있는 프론트엔드 영역을 /public 이하로 지정하는 것.(그 외 서버 파일들은 유저들이 들여다볼 수 없음)
// http://localhost:3000/public/js/app.js 페이지 로딩
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home")); // home.pug를 render 해주는 route
app.get("/*", (req, res) => res.redirect("/")); // 유저가 어떤 url을 작성해도 홈으로 보내는 작업

const handleListen = () => console.log(`Listening on http:localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
    console.log("Connected to Browser");
    socket.on("close", () => console.log("Disconnected from the Browser")); // 브라우저가 닫치면 close 발생시킴
    socket.on("message", (message) => {
        console.log(message.toString('utf8'));
    });
    socket.send("welcome to chat");
});

server.listen(3000, handleListen); // 포트 3000을 listen 해줄 것.