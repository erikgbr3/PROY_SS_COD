let chai = require ('chai');
let chaiHttp = require ('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'https://webservice-jjamw0pn5-sportservice2023-gmailcom.vercel.app/api';

describe("Mostrar jugador", () => {
    it("Debe mostrar un jugador", (done) => {
        chai.request(url)
        .get('/players?id=2')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
    })
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

    it("Debe mostrar un mensaje de no encontrado, no se encontro el jugador", (done) => {
        chai.request(url)
        .get('/players?id=7')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(404);
            done();
        })
    })
});

describe("Registrar jugador", () => {
    it("Debe registrar nuevo jugador", (done) => {
        chai.request(url)
        .post('/players')
        .send({
            id: 4,
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

    it("Debe mostrar un mensaje de campo obligatorio cuando se envian campos vacios", (done) => {
        chai.request(url)
        .post('/players')
        .send({
            id: 5,
            lastname: "lastname test",
            age: "21",
            position: "6",
            cellphone: "2345678910",
            curp: "tssiiiq1122001",
            clubId: 1
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
        .post('/players')
        .send({
            id: 6,
            name: "player test",
            lastname: "lastname test",
            age: "diez",
            numberjersey: "dos",
            position: "tres",
            cellphone: "2345678910",
            curp: "tssiiiq1122001",
            clubId: 1
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});

describe("Actualizar jugador", () => {
    it("Debe Actualizar un jugador existente", (done) => {
        chai.request(url)
        .put('/players')
        .send({
            id: 4,
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

    it("Debe mostrar un mensaje de error, Faltan datos para actualizar o el id es incorrecto", (done) => {
        chai.request(url)
        .put('/players')
        .send({
            id: 4,
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
        .put('/players')
        .send({
            id: 7,
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
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        })
    })
});

describe("Eliminar jugador", () => {
    it("Debe eliminar un jugador existente", (done) => {
        chai.request(url)
        .delete('/players?id=4')
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        })
    })

    it("Debe mostrar un mensaje de error, Ocurrio un error al procesar la petición", (done) => {
        chai.request(url)
        .delete('/players?=')
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        })
    })

    it("Debe mostrar un mensaje de no encontrado, El jugador no existe", (done) => {
        chai.request(url)
        .delete('/players?id=6')
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});