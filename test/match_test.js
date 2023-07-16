let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

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
                    homeTeamId: 5,
                    scoreHome: 4,
                    visitorTeamId: 3,
                    scoreVisitor: 2,
                    date: "2023/07/16",
                    hour: "13:00",
                    leagueId: 4,
                    refereeId: 5
                })
                .end((err, res) => {
                    // console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('matches');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
});

describe('Actualización de partidos', ()=>{
    it('Debe actualizar un partido', (done) =>{
        chai.request(url)
            .put('/matches')
            .send({
                id: 13,
                homeTeamId: 5,
                scoreHome: 4,
                visitorTeamId: 3,
                scoreVisitor: 2,
                date: "2023/07/16",
                hour: "12:00",
                leagueId: 4,
                refereeId: 5
            })
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('result');
                expect(res.body.result).to.have.property('success');
                expect(res.body).to.have.property('message');
                done();
            });
    });
});

describe('Eliminación de partidos', ()=>{
    it('Debe eliminar un partido', (done) =>{
        chai.request(url)
            .delete('/matches?id=12')
            .send({
                homeTeamId: 4,
                scoreHome: 1,
                visitorTeamId: 3,
                scoreVisitor: 2,
                date: "2023/01/06",
                hour: "14:00",
                leagueId: 2,
                refereeId: 2,
            })
            .end((err, res) => {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
    });
});
