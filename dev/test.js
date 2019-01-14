const Blockchain=require('./blockchain');
const bitcoin=new Blockchain();

const previousBlockHash='tirtv';
const currentBlockData=[
{
	amount:10,
	sender:'yo123',
	recipient:'otro12'
},
{
	amount:30,
	sender:'nose1235',
	recipient:'yo123'
},
{
	amount:200,
	sender:'alguienmas24',
	recipient:'otro12'
}
];

//const nonce = 100;

//bitcoin.createNewBlock(2050, 'TUMAMAENTANGAXD', '499J9359F9H959455');

//bitcoin.createNewTransaction(1000,'289yio','vero93');

//bitcoin.createNewBlock(44545, 'TUabuelaENTANGAXD', '557565656jh');

//bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);

//bitcoin.proofOfWork(previousBlockHash,currentBlockData)

console.log(bitcoin);