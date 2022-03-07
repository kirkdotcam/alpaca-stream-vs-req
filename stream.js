let app = require("express")();

const http = require("http").Server(app);
const io = require("socket.io")(http);

const Alpaca = require("@alpacahq/alpaca-trade-api");
const apcaKey = process.env.APCA_API_KEY_ID;
const apcaSec = process.env.APCA_API_SECRET_KEY;

const alpaca = new Alpaca({
    keyId: apcaKey,
    secretKey: apcaSec,
    paper: true
  });

app.get("/", (reg, res)=>{
    res.sendFile(__dirname+"/index.html")
});

const cryptoWebsocket = alpaca.crypto_stream_v2
cryptoWebsocket.connect();
cryptoWebsocket.onConnect(()=>{

    cryptoWebsocket.subscribeForQuotes(["ETHUSD"]);
    console.log("subbed");
});

cryptoWebsocket.onCryptoQuote((quote)=> {
    console.log(quote)
    io.emit("quote", quote);
});

io.on("connection", (socket)=>{
    console.log("client connected");
});

io.on("disconnect", (socket)=>{
    console.log("client disconnected");
});

http.listen(3000, ()=>{
    console.log("running");
})