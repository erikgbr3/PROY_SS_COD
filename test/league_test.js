let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

describe("Crear Liga", () =>{
  it("Se debe crear la Liga cuando tenga todoso los datos", (done) => {
    chai.request(url)
    .post('/leagues')
    .send({
      //cuerpo
      name: "Liga de Fútbol Rápido Sub 15",
      cost: 250,
      prize: "$1200 primer lugar, $800 segundo lugar",
      init: "2023/09/01",
      description: "Rama Varonil Libre",
      ownerId: 4
    })
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('league');
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar el registro cuando haga falta el id del propietario", (done) => {
    chai.request(url)
    .post('/leagues')
    .send({
      //cuerpo
      name: "Liga de Fútbol Rápido Sub 18",
      cost: 250,
      prize: "$1200 primer lugar, $800 segundo lugar",
      init: "2023/09/01",
      description: "Rama Varonil Libre"
    })
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar el registro cuando la fecha de inicio no tenga el formato yyyy/mm/dd", (done) => {
    chai.request(url)
    .post('/leagues')
    .send({
      //cuerpo
      name: "Liga de Fútbol Rápido Sub 18",
      cost: 250,
      prize: "$1200 primer lugar, $800 segundo lugar",
      init: "01/10/2023",
      description: "Rama Varonil Libre",
      ownerId: 4
    })
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })
})

describe("listado de Ligas", () =>{
  it("Se debe mostrar la lista de usuarios registrados", (done) => {
    chai.request(url)
    .get('/leagues')
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array')
      done();
    })
  })

  it("no se puede ver la lista porque está mal escrita la ruta", (done) => {
    chai.request(url)
    .get('/league')
    .end(function(err, res){
      expect(res).to.have.status(404);
      done();
    })
  })

  it("no se muestra el listado porque la ruta lleva números en vez de texto", (done) => {
    chai.request(url)
    .get('/l3agu3')
    .end(function(err, res){
      expect(res).to.have.status(404);
      done();
    })
  })
})

describe("Actualización de Liga", () =>{
  it("Se debe actualizar el usuario mediante su id", (done) => {
    chai.request(url)
    .put('/leagues?id=1')
    .send({
      //cuerpo
      name: "Liga de Fútbol Rápido Sub 18",
      cost: 450,
      prize: "$1200 primer lugar, $800 segundo lugar",
      init: "2023/09/01",
      description: "Rama Varonil Libre",
      ownerId: 4
    })
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar la actualización porque hacen falta el ID de la liga", (done) => {
    chai.request(url)
    .put('/leagues?')
    .send({
      //cuerpo
      cost: 500
    })
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("No se actualizará el usuario si la inscripción es escrita en texto", (done) => {
    chai.request(url)
    .put('/leagues?id=4')
    .send({
      //cuerpo
      cost: "1000 pesos",
      
    })
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })
})

describe("Eliminar Liga", () =>{
  it("Se debe eliminar la liga mediante su id", (done) => {
    chai.request(url)
    .delete('/leagues?id=6')
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar la eliminación porque hace falta el ID", (done) => {
    chai.request(url)
    .delete('/leagues')
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar la eliminación porque el id no existe", (done) => {
    chai.request(url)
    .delete('/leagues?Id=36')
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })
})