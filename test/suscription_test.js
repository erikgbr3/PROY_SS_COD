let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

describe("Suscribir club a una liga", () =>{
  it("se debe inscribir un club a una liga cuando se indique que club se inscribe en que liga", (done) => {
    chai.request(url)
    .post('/suscriptions')
    .send({
      //cuerpo
      leagueId: 1,
      clubId: 1
    })
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('suscription');
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar el registro cuando haga falta el id del club", (done) => {
    chai.request(url)
    .post('/suscriptions')
    .send({
      //cuerpo
      leagueId: 1,
    })
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar el registro cuando el club o la liga sea escrita en texto y no con el ID", (done) => {
    chai.request(url)
    .post('/suscriptions')
    .send({
      //cuerpo
      leagueId: 1,
      clubId: "Alucines"
    })
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })
})

describe("listado de las suscripciones", () =>{
  it("Se debe mostrar la lista de las suscripciones", (done) => {
    chai.request(url)
    .get('/suscriptions')
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array')
      done();
    })
  })

  it("no se puede ver la lista porque está mal escrita la ruta", (done) => {
    chai.request(url)
    .get('/suscription')
    .end(function(err, res){
      expect(res).to.have.status(404);
      done();
    })
  })

  it("no se muestra el listado porque la ruta lleva números en vez de texto", (done) => {
    chai.request(url)
    .get('/suscr1pti0ns')
    .end(function(err, res){
      expect(res).to.have.status(404);
      done();
    })
  })
})

describe("Actualización de una suscripción", () =>{
  it("Se debe actualizar la suscripción mediante el Id", (done) => {
    chai.request(url)
    .put('/suscriptions?id=1')
    .send({
      //cuerpo
      leagueId: 8
    })
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar la actualización porque hacen falta el ID de la suscripción a cambiar", (done) => {
    chai.request(url)
    .put('/suscriptions?')
    .send({
      //cuerpo
      clubId: 4
    })
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("No se actualizará la suscrición si viene en formato de texto", (done) => {
    chai.request(url)
    .put('/suscriptions?id=1')
    .send({
      //cuerpo
      leagueId: "2",
      
    })
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })
})

describe("Eliminar la suscripción", () =>{
  it("Se debe eliminar la suscripción mediante el Id", (done) => {
    chai.request(url)
    .delete('/suscriptions?id=4')
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar la eliminación porque hace falta el ID", (done) => {
    chai.request(url)
    .delete('/suscriptions')
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar la eliminación porque el id de la suscripción no existe", (done) => {
    chai.request(url)
    .delete('/suscriptions?Id=30')
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })
})