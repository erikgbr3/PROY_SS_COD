let chai = require ('chai');
let chaiHttp = require ('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

describe("registrar usuario", () => {
    it("Debe registrar nuevo Rol", (done) => {
        chai.request(url)
        .post('/roles')
        .send({
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

    it("Debe rechazar registrar nuevo Rol", (done) => {
        chai.request(url)
        .post('/roles')
        .send({
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