let chai = require ('chai');
let chaiHttp = require ('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

describe("Mostrar usuario usuario", () => {
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
});

describe("Registrar usuario", () => {
    it("Debe registrar nuevo Rol", (done) => {
        chai.request(url)
        .post('/roles')
        .send({
            id: 2,
            role: "user test"
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            expect(res.body.role).to.exist;
            done();
        })
    })
});

describe("Actualizar usuario", () => {
    it("Debe Actualizar un Rol existente", (done) => {
        chai.request(url)
        .put('/roles')
        .send({
            id: 2,
            role: "User test"
        })
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});

describe("Eliminar usuario", () => {
    it("Debe eliminar un Rol existente", (done) => {
        chai.request(url)
        .delete('/roles?id=2')
        .send({})
        .end( function(err, res){
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        })
    })
});