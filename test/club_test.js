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
                    fieldId: 3,
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
});

describe('Actualización de clubs', ()=>{
    it('Debe actualizar un club', (done) =>{
        chai.request(url)
            .put('/sportFields')
            .send({
                id: 6,
                name: "Pericos",
                locality: "Xuchapa",
                fieldId: 4,
                ownerTeamId: 1
            })
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
    });
});

describe('Eliminación de clubs', ()=>{
    it('Debe eliminar un club', (done) =>{
        chai.request(url)
            .delete('/clubs?id=5')
            .send({})
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
    });
});
