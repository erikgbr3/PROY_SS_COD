let chai = require ('chai');
let chaiHttp = require ('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

describe("Mostrar puntuaciones de gol", () => {
    it("Debe mostrar lista de puntuaciones", (done) => {
        chai.request(url)
        .get('/goalScores')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
    })
});

describe("Registrar puntuación", () => {
    it("Debe registrar nueva puntuación", (done) => {
        chai.request(url)
        .post('/goalScores')
        .send({
            id: 2,
            playerId: 2,
            score: 1,
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
});

describe("Actualizar puntuación", () => {
    it("Debe Actualizar una puntuación existente", (done) => {
        chai.request(url)
        .put('/goalScores?id=2')
        .send({
            playerId: 2,
            score: 2,
	        matchId: 1,
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});

describe("Eliminar puntuación", () => {
    it("Debe eliminar una puntuación existente", (done) => {
        chai.request(url)
        .delete('/goalScores?id=2')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});