let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'https://webservice-jjamw0pn5-sportservice2023-gmailcom.vercel.app/api';

describe('Lista de campos', ()=>{
    it('Debe mostrar todos los campos', (done) =>{
        chai.request(url)
            .get('/sportFields')
            .send({})
            .end(function(err, res) {
                // console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('Registro de campos', ()=>{
        it('Debe registrar un nuevo campo', (done) =>{
            chai.request(url)
                .post('/sportFields')
                .send({
                    id: 3,
                    ubication: "San Martin La Flor",
                    name: "El Durazno"
                })
                .end(function(err, res) {
                    // console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('sportfield');
                    expect(res.body.sportfield).to.have.property('name');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
        it('No debe registrar el campo por datos faltantes', (done) =>{
            chai.request(url)
                .post('/sportFields')
                .send({
                    name: "El Durazno"
                })
                .end(function(err, res) {
                    // console.log(res.body)
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('errors');
                    done();
                });
        });
        it('No debe registrar el campo por datos erroneos', (done) =>{
            chai.request(url)
                .post('/sportFields')
                .send({
                    ubication: 3,
                    name: "El Durazno"
                })
                .end(function(err, res) {
                    // console.log(res.body)
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('errors');
                    done();
                });
        });
});

describe('Actualización de campos', ()=>{
    it('Debe actualizar un campo', (done) =>{
        chai.request(url)
            .put('/sportFields')
            .send({
                id: 3,
                ubication: "Xochimilco",
                name: "La Malosa"
            })
            .end(function(err, res) {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
    });
    it('No debe actualizar el campo por datos faltantes', (done) =>{
        chai.request(url)
            .put('/sportFields')
            .send({
                ubication: "San Antonio las Iguanas",
                name: "La Iguana Tieza"
            })
            .end(function(err, res) {
                // console.log(res.body)
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('errors');
                done();
            });
    });
    it('No debe actualizar el campo por datos incorrectos', (done) =>{
        chai.request(url)
            .put('/sportFields')
            .send({
                id: 3,
                ubication: 4,
                name: "La Iguana Tieza"
            })
            .end(function(err, res) {
                // console.log(res.body)
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('errors');
                done();
            });
    });
});

describe('Eliminación de campos', ()=>{
    it('Debe eliminar un campo', (done) =>{
        chai.request(url)
            .delete('/sportFields?id=3')
            .end(function(err, res) {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
    });
    it('No debe eliminar el campo por datos faltantes', (done) =>{
        chai.request(url)
            .delete('/sportFields')
            .end(function(err, res)  {
                // console.log(res.body)
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('errors');
                done();
            });
    });
    it('No debe eliminar el campo por datos erroneos', (done) =>{
        chai.request(url)
            .delete('/sportFields?id=30')
            .end(function(err, res) {
                // console.log(res.body)
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('message');
                done();
            });
    });
});
