const Blockchain=require('./blockchain');
const bitcoin=new Blockchain();

/*const previousBlockHash='tirtv';
const currentBlockData=[
{amount:10,sender:'yo123',recipient:'otro12'},
{amount:30,sender:'nose1235',recipient:'yo123'},
{amount:200,sender:'alguienmas24',recipient:'otro12'}
];*/
//const nonce = 100;
//bitcoin.createNewBlock(2050, 'TUMAMAENTANGAXD', '499J9359F9H959455');
//bitcoin.createNewTransaction(1000,'289yio','vero93');
//bitcoin.createNewBlock(44545, 'TUabuelaENTANGAXD', '557565656jh');
//bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);
//bitcoin.proofOfWork(previousBlockHash,currentBlockData)

const bc = {
"chain": [
{
"index": 1,
"timestamp": 1549501403610,
"transactions": [],
"nonce": 100,
"hash": "0",
"previousBlockHash": "0"
}
],
"pendingTransactions": [
{
"sender": "TUMAMAENTANGAA:V",
"recipient": "TUPAPIRIKO:v",
"transactionId": "1555de402a7511e98f73edc21f5bc0d5"
},
{
"sender": "ELDELCALZON:V",
"recipient": "ELPAPIRIKO:v",
"transactionId": "1a9dcc002a7511e9954d5908c43f570f"
},
{
"sender": "ELDELCALZON:V",
"recipient": "ELPAPIRIKO:v",
"transactionId": "278309302a7511e9954d5908c43f570f"
}
],
"currentNodeUrl": "http://localhost:3001",
"networkNodes": [
"http://localhost:3002",
"http://localhost:3003",
"http://localhost:3004",
"http://localhost:3005"
]
};

//console.log(bitcoin);
console.log('VALIDO:', bitcoin.chainIsValid(bc.chain)); // True o False