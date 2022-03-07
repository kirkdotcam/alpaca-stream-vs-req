const Alpaca = require('@alpacahq/alpaca-trade-api');
const apcaKey = process.env.APCA_API_KEY_ID;
const apcaSec = process.env.APCA_API_SECRET_KEY;

const alpaca = new Alpaca({
  keyId: apcaKey,
  secretKey: apcaSec,
  paper: true
})

async function getbars() {


return await alpaca.getBarsV2(
 "ENPH",
  {
    "start":"2022-01-01",
    "end":"2022-03-01",
    "timeframe":"1Day",
    "adjustment":"all"
  }
)

}
//getbars().then((res)=> res.next().then(res => console.log(res) ) )

getbars().then(async (res)=>{
	//create empty array
	//add elements to array in the for-loop
	//change end of request to today, and timeframe to higher frequency

	for await (let bar of res){
		console.log(bar);
	}

})
