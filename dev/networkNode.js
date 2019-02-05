const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const port = process.argv[2];
const rp = require('request-promise');

const nodeAddress = uuid().split('-').join('');

const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/blockchain', function(req, res){
	res.send(bitcoin);
});

app.post('/transaction', function(req, res){
	const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
	res.json({note:`Transacción agregada en el bloque ${blockIndex}.`});
});

app.get('/mine', function(req, res){
	const lastBlock = bitcoin.getLastBlock();

	const previousBlockHash = lastBlock['hash'];

	const currentBlockData = {
		transactions:bitcoin.pendingTransactions,
		index:lastBlock['index']+1
	};

	const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
	const blockhash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

	bitcoin.createNewTransaction(12.5, "00", nodeAddress);
	
	const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
	res.json({
		note: "Nuevo bloque minado correctamente",
		block: newBlock
	})

});

app.post('/register-and-broadcast-node', function (req, res){
	const newNodeUrl = req.body.newNodeUrl;
	if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);

	const regNodesPromises = [];

	bitcoin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/register-node',
			method: 'POST',
			body: { newNodeUrl: newNodeUrl },
			json: true
		};
		regNodesPromises.push(rp(requestOptions));
	});

	Promise.all(regNodesPromises)
	.then(data => {
		const bulkRegisterOptions = {
			uri:  newNodeUrl + '/register-nodes-bulk',
			method: 'POST',
			body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl] },
			json: true
		};
		return rp(bulkRegisterOptions);
	})
	.then(data => {
		res.json({ note: 'Nuevo nodo registrado en la red correctamente' });
	});
});

// registrar un nodo en la red
app.post('/register-node', function(req, res){
	const newNodeUrl = req.body.newNodeUrl;
	const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
	const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
	if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
	res.json({note: 'Nuevo nodo registrado correctamente'});
});

// registrar multiples nodos en uno
app.post('/register-nodes-bulk', function(req, res){
	const allNetworkNodes = req.body.allNetworkNodes;
	allNetworkNodes.forEach(networkNodeUrl => {
		const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
		const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
		if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
	});
	res.json({ note: 'Bloques registrados correctamente' });
});

app.listen(port, function(){
	console.log(`Listen on port ${port} ...`);
});