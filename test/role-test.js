let chai = require ('chai');
let chaiHttp = require ('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'https://webservice-jjamw0pn5-sportservice2023-gmailcom.vercel.app/api';

describe("Mostrar Rol", () => {
    it("Debe mostrar un rol", (done) => {
        chai.request(url)
        .get('/roles?id=2')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe mostrar lista de Roles existente", (done) => {
        chai.request(url)
        .get('/roles')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
    })

    it("Debe mostrar un mensaje de no encontrado, No se encontro el rol", (done) => {
        chai.request(url)
        .get('/roles?id=7')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(404);
            done();
        })
    })
});

describe("Registrar Rol", () => {
    it("Debe registrar nuevo Rol", (done) => {
        chai.request(url)
        .post('/roles')
        .send({
            id: 3,
            role: "role test"
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            expect(res.body.role).to.exist;
            done();
        })
    })

    it("Debe mostrar un mensaje de campo obligatorio cuando se envian campos vacios", (done) => {
        chai.request(url)
        .post('/roles')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        })
    })

    it("Debe mostrar un mensaje de error de validación", (done) => {
        chai.request(url)
        .post('/roles')
        .send({
            id: 3,
            role: "232343"
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});

describe("Actualizar Rol", () => {
    it("Debe Actualizar un Rol existente", (done) => {
        chai.request(url)
        .put('/roles')
        .send({
            id: 3,
            role: "User Test"
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        })
    })

    it("Debe mostrar un mensaje de error, Faltan datos para actualizar o el id es icorrecto", (done) => {
        chai.request(url)
        .put('/roles')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        })
    })

    it("Debe mostrar un mensaje de error, El ID es incorrecto", (done) => {
        chai.request(url)
        .put('/roles')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        })
    })
});

describe("Eliminar Rol", () => {
    it("Debe eliminar un Rol existente", (done) => {
        chai.request(url)
        .delete('/roles?id=3')
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        })
    })

    it("Debe mostrar un mensaje de error, Ocurrio un error a procesar la petición", (done) => {
        chai.request(url)
        .delete('/roles?=')
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
        })
    })

    it("Debe mostrar un mensaje de no encontrado, El rol no existe", (done) => {
        chai.request(url)
        .delete('/roles?id=5')
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});