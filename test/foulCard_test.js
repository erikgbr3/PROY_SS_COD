let chai = require ('chai');
let chaiHttp = require ('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'https://webservice-jjamw0pn5-sportservice2023-gmailcom.vercel.app/api';

describe("Mostrar tarjetas de falta", () => {
    it("Debe mostrar una tarjeta", (done) => {
        chai.request(url)
        .get('/foulCards?id=2')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe mostrar lista de tarjetas", (done) => {
        chai.request(url)
        .get('/foulCards')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe mostrar un mensaje de no encontrado, no se encontro la tarjeta", (done) => {
        chai.request(url)
        .get('/foulCards?id=7')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(404);
            done();
        })
    })
});

describe("Registrar tarjeta", () => {
    it("Debe registrar nueva tarjeta", (done) => {
        chai.request(url)
        .post('/foulCards')
        .send({
            id: 3,
            playerId: 3,
	        matchId: 1,
	        color: "yellow"
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            expect(res.body.foulCard).to.exist;
            done();
        })
    })

    it("Debe mostrar un mensaje de campo obligatorio cuando se envian capos vacios", (done) => {
        chai.request(url)
        .post('/foulCards')
        .send({
            id: 4,
            playerId: 2,
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        })
    })

    it("Debe mostrar un mensaje de error en la validación", (done) => {
        chai.request(url)
        .post('/foulCards')
        .send({
            id: 5,
            playerId: "tres",
	        matchId: "uno",
	        color: "234"
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});

describe("Actualizar tarjeta", () => {
    it("Debe Actualizar una tarjeta existente", (done) => {
        chai.request(url)
        .put('/foulCards')
        .send({
            id: 3,
            playerId: 3,
	        matchId: 1,
	        color: "red"
        })
        .end( function(err, res){
            console.log(res.body); 
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        })
    })

    it("Debe mostrar un mensaje de error, Faltan datos para actualizar o el id es incorrecto", (done) => {
        chai.request(url)
        .put('/foulCards')
        .send({
            id: 3,
        })
        .end( function(err, res){
            console.log(res.body); 
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        })
    })

    it("Debe mostrar un mensaje de error, El ID es incorrecto", (done) => {
        chai.request(url)
        .put('/foulCards')
        .send({
            id: 5,
            playerId: 1,
	        matchId: 1,
	        color: "red"
        })
        .end( function(err, res){
            console.log(res.body); 
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        })
    })
});

describe("Eliminar tarjeta", () => {
    it("Debe eliminar una tarjeta existente", (done) => {
        chai.request(url)
        .delete('/foulCards?id=3')
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        })
    })

    it("Debe mostrar un mensaje de error, Ocurrio un error al procesar la petición", (done) => {
        chai.request(url)
        .delete('/foulCards?=')
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        })
    })

    it("Debe mostrar un mensaje de no encontrado, La tarjeta no existe", (done) => {
        chai.request(url)
        .delete('/foulCards?id=5')
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});