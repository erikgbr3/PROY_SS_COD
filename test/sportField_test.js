let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

describe('Lista de campos', ()=>{
    it('Debe mostrar todos los campos', (done) =>{
        chai.request(url)
            .get('/sportFields')
            .send({})
            .end((err, res) => {
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
                    ubication: "San Martin La Flor",
                    name: "El Durazno"
                })
                .end((err, res) => {
                    // console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('sportfield');
                    expect(res.body.sportfield).to.have.property('name');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
});

describe('Actualización de campos', ()=>{
    it('Debe actualizar un campo', (done) =>{
        chai.request(url)
            .put('/sportFields')
            .send({
                id: 9,
                ubication: "San Martin La Flor",
                name: "La Malosa"
            })
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
    });
});

describe('Eliminación de campos', ()=>{
    it('Debe eliminar un campo', (done) =>{
        chai.request(url)
            .delete('/sportFields?id=9')
            .send({})
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
    });
});
