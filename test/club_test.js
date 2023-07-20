let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

describe('Lista de clubs', ()=>{
    it('Debe mostrar todos los clubs', (done) =>{
        chai.request(url)
            .get('/clubs')
            .send({})
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('Registro de clubs', ()=>{
        it('Debe registrar un nuevo club', (done) =>{
            chai.request(url)
                .post('/clubs')
                .send({
                    name: "Pericos",
                    locality: "Xuchapa",
                    fieldId: 2,
                    ownerTeamId: 1
                })
                .end((err, res) => {
                    // console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('club');
                    expect(res.body.club).to.have.property('name');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
        it('No debe registrar un nuevo club por datos faltantes', (done) =>{
            chai.request(url)
                .post('/clubs')
                .send({
                    locality: "Xuchapa",
                    fieldId: 3,
                    ownerTeamId: 1
                })
                .end((err, res) => {
                    // console.log(res.body)
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('errors');
                    done();
                });
        });
        it('No debe registrar un nuevo club por datos erroneos', (done) =>{
            chai.request(url)
                .post('/clubs')
                .send({
                    name: 23,
                    locality: "Xuchapa",
                    fieldId: "tres",
                    ownerTeamId: 1
                })
                .end((err, res) => {
                    // console.log(res.body)
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('errors');
                    done();
                });
        });
});

describe('Actualización de clubs', ()=>{
    it('Debe actualizar un club', (done) =>{
        chai.request(url)
            .put('/sportFields')
            .send({
                id: 3,
                name: "Pericos",
                locality: "Ayutla",
                fieldId: 2,
                ownerTeamId: 1
            })
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
    });
    it('No debe actualizar el club por datos faltantes', (done) =>{
        chai.request(url)
            .put('/sportFields')
            .send({
                name: "Pericos",
                locality: "Xuchapa",
                fieldId: 4,
                ownerTeamId: 1
            })
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('errors');
                done();
            });
    });
    it('No debe actualizar el club por datos incorrectos', (done) =>{
        chai.request(url)
            .put('/sportFields')
            .send({
                id: 2,
                name: 23,
                locality: 3,
                fieldId: 4,
                ownerTeamId: 1
            })
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('errors');
                done();
            });
    });
});

describe('Eliminación de clubs', ()=>{
    it('Debe eliminar un club', (done) =>{
        chai.request(url)
            .delete('/clubs?id=4')
            .send({})
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done(); 
            });
    });
    it('No debe eliminar el club por datos faltantes', (done) =>{
        chai.request(url)
            .delete('/clubs')
            .send({})
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('errors');
                done();
            });
    });
    it('No debe eliminar el club por datos erroneos', (done) =>{
        chai.request(url)
            .delete('/clubs?id=202')
            .send({})
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('message');
                done();
            });
    });
});
