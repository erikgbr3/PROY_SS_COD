let chai = require ('chai');
let chaiHttp = require ('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

describe("Mostrar jugador", () => {
    it("Debe mostrar lista de jugadores", (done) => {
        chai.request(url)
        .get('/players')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
    })
});

describe("Registrar jugador", () => {
    it("Debe registrar nuevo jugador", (done) => {
        chai.request(url)
        .post('/players')
        .send({
            id: 2,
            name: "player test",
            lastname: "lastname test",
            age: "21",
            numberjersey: "17",
            position: "6",
            cellphone: "2345678910",
            curp: "tssiiiq1122001",
            clubId: 1
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            expect(res.body.player).to.exist;
            done();
        })
    })
});

describe("Actualizar juagdor", () => {
    it("Debe Actualizar un jugador existente", (done) => {
        chai.request(url)
        .put('/players?id=2')
        .send({
            name: "Player test",
            lastname: "Lastname test",
            age: "20",
            numberjersey: "11",
            position: "6",
            cellphone: "2345678910",
            curp: "tssiiiq1122001",
            clubId: 1
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});

describe("Eliminar jugador", () => {
    it("Debe eliminar un jugador existente", (done) => {
        chai.request(url)
        .delete('/players?id=2')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});