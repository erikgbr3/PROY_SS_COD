let chai = require ('chai');
let chaiHttp = require ('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'https://webservice-jjamw0pn5-sportservice2023-gmailcom.vercel.app/api';

describe("Mostrar marcadores", () => {
    it("Debe mostrar un marcador", (done) => {
        chai.request(url)
        .get('/goalScores?id=2')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe mostrar lista de marcadores", (done) => {
        chai.request(url)
        .get('/goalScores')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe mostrar un mensaje de no encontado, No se enconcontro el marcador", (done) => {
        chai.request(url)
        .get('/goalScores?id=5')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(404);
            done();
        })
    })
});

describe("Registrar marcador", () => {
    it("Debe registrar nuevo marcador", (done) => {
        chai.request(url)
        .post('/goalScores')
        .send({
            id: 4,
            playerId: 2,
            score: 3,
	        matchId: 1,
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            expect(res.body.goalScore).to.exist;
            done();
        })
    })

    it("Debe mostrar un mensaje de campo obligatorio cuando se envian campos vacios", (done) => {
        chai.request(url)
        .post('/goalScores')
        .send({
            id: 5,
            playerId: 3,
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
        .post('/goalScores')
        .send({
            id: 6,
            playerId: "dos",
            score: "tres",
	        matchId: "uno",
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});

describe("Actualizar marcador", () => {
    it("Debe Actualizar un marcador existente", (done) => {
        chai.request(url)
        .put('/goalScores')
        .send({
            id: 4,
            playerId: 2,
            score: 4,
	        matchId: 1,
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
        .put('/goalScores')
        .send({
            Id: 5,
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
        .put('/goalScores')
        .send({
            id: 7,
            playerId: 3,
            score: 4,
	        matchId: 1,
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        })
    })
});

describe("Eliminar marcador", () => {
    it("Debe eliminar un marcador existente", (done) => {
        chai.request(url)
        .delete('/goalScores?id=4')
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        })
    })

    it("Debe mostrar un mensaje de error, Ocurrio un error al procesar la petición", (done) => {
        chai.request(url)
        .delete('/goalScores?=')
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        })
    })

    it("Debe mostrar un mensaje de no encontrado, El marcador no exite", (done) => {
        chai.request(url)
        .delete('/goalScores?id=7')
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});