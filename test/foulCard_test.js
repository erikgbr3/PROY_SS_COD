let chai = require ('chai');
let chaiHttp = require ('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

describe("Mostrar tarjetas de falta", () => {
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
});

describe("Registrar tarjeta", () => {
    it("Debe registrar nueva tarjeta", (done) => {
        chai.request(url)
        .post('/foulCards')
        .send({
            id: 2,
            playerId: 2,
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
});

describe("Actualizar tarjeta", () => {
    it("Debe Actualizar una tarjeta existente", (done) => {
        chai.request(url)
        .put('/foulCards?id=2')
        .send({
            playerId: 2,
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
});

describe("Eliminar tarjeta", () => {
    it("Debe eliminar una tarjeta existente", (done) => {
        chai.request(url)
        .delete('/foulCards?id=2')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});