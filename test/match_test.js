let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'https://webservice-jjamw0pn5-sportservice2023-gmailcom.vercel.app/api';

describe('Lista de partidos', ()=>{
    it('Debe mostrar todos los partidos', (done) =>{
        chai.request(url)
            .get('/matches')
            .send({})
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('Registro de partidos', ()=>{
        it('Debe registrar un nuevo partido', (done) =>{
            chai.request(url)
                .post('/matches')
                .send({
                    id: 2,
                    homeTeamId: 2,
                    scoreHome: 10,
                    visitorTeamId: 1,
                    scoreVisitor: 5,
                    date: "2023/05/21",
                    hour: "18:00",
                    leagueId: 1,
                    refereeId: 1
                })
                .end(function(err, res) {
                    // console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('matches');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
        it('No debe permitir registrar el partido por datos faltantes', (done) =>{
            chai.request(url)
                .post('/matches')
                .send({
                    homeTeamId: 3,
                    visitorTeamId: 2,
                    scoreVisitor: 5,
                    date: "2023/05/21",
                    hour: "22:00",
                    leagueId: 2,
                    refereeId: 1
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
        it('No debe permitir registrar el partido por datos incorrectos', (done) =>{
            chai.request(url)
                .post('/matches')
                .send({
                    homeTeamId: 3,
                    scoreHome: "dos",
                    visitorTeamId: 2,
                    scoreVisitor: 5,
                    date: "2023/05/21",
                    hour: "16:00",
                    leagueId: 2,
                    refereeId: 1
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

describe('Actualización de partidos', ()=>{
    it('Debe actualizar un partido', (done) =>{
        chai.request(url)
            .put('/matches')
            .send({
                id: 2,
                homeTeamId: 2,
                scoreHome: 4,
                visitorTeamId: 1,
                scoreVisitor: 2,
                date: "2023/06/16",
                hour: "09:00",
                leagueId: 1,
                refereeId: 5
            })
            .end(function(err, res) {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('result');
                expect(res.body.result).to.have.property('success');
                expect(res.body).to.have.property('message');
                done();
            });
    });
    it('No debe actualizar el partido por datos faltantes', (done) =>{
        chai.request(url)
            .put('/matches')
            .send({
                homeTeamId: 3,
                scoreHome: 2,
                visitorTeamId: 2,
                scoreVisitor: 5,
                date: "2023/05/21",
                hour: "12:00",
                leagueId: 2,
                refereeId: 1
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
    it('No debe actualizar el partido por datos incorrectos', (done) =>{
        chai.request(url)
            .put('/matches')
            .send({
                id: 10,
                homeTeamId: "tres",
                scoreHome: 2,
                visitorTeamId: 2,
                scoreVisitor: 5,
                date: "2023/05/21",
                hour: "21:00",
                leagueId: 2,
                refereeId: 1
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

describe('Eliminación de partidos', ()=>{
    it('Debe eliminar un partido', (done) =>{
        chai.request(url)
            .delete('/matches?id=2')
            .end(function(err, res) {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
    });
    it('No debe eliminar el partido por datos faltantes', (done) =>{
        chai.request(url)
            .delete('/matches')
            .end(function(err, res) {
                // console.log(res.body)
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('errors');
                done();
            });
    });
    it('No debe eliminar el partido por datos incorrectos', (done) =>{
        chai.request(url)
            .delete('/matches?id=40')
            .end(function(err, res) {
                // console.log(res.body)
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('message');
                done();
            });
    });
});
