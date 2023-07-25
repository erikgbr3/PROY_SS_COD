let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

describe("Registro de Usuario", () =>{
  it("Se debe registrar un nuevo usuario", (done) => {
    chai.request(url)
    .post('/users')
    .send({
      //cuerpo
      id: 2,
      username: "Eric Fdz",
      email: "eric2@gmail.com",
      password: "12345678",
      roleId: 1
    })
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('user');
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar el registro de usuario porque hacen falta el rol del usuario", (done) => {
    chai.request(url)
    .post('/users')
    .send({
      //cuerpo
      username: "Jesús",
      email: "jesús1@gmail.com",
      password: "12345678",
    })
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar el registro de usuario porque el nombre no acepta números", (done) => {
    chai.request(url)
    .post('/users')
    .send({
      //cuerpo
      username: "J3sús",
      email: "jesús2@gmail.com",
      password: "12345678",
      roleId: 1
    })
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })
})

describe("listado de Usuarios", () =>{
  it("Se debe mostrar la lista de usuarios registrados", (done) => {
    chai.request(url)
    .get('/users')
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array')
      done();
    })
  })

  it("no se puede ver la lista porque está mal escrita la ruta", (done) => {
    chai.request(url)
    .get('/user')
    .end(function(err, res){
      expect(res).to.have.status(404);
      done();
    })
  })

  it("no se muestra el listado porque la ruta lleva números en vez de texto", (done) => {
    chai.request(url)
    .get('/us3rs')
    .end(function(err, res){
      expect(res).to.have.status(404);
      done();
    })
  })
})

describe("Actualización de Usuario", () =>{
  it("Se debe actualizar el usuario mediante su id", (done) => {
    chai.request(url)
    .put('/users?id=2')
    .send({
      //cuerpo
      username: "Jesús Hdz",
      email: "jesús@gmail.com",
      password: "12345678",
      roleId: 1
    })
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar la actualización del usuario porque hacen falta el ID del Usuario", (done) => {
    chai.request(url)
    .put('/users?')
    .send({
      //cuerpo
      roleId: 2
    })
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("No se actualizará el usuario si su nombre contiene números", (done) => {
    chai.request(url)
    .put('/users?id=4')
    .send({
      //cuerpo
      name: "j3sus",
      
    })
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })
})

describe("Eliminar Usuario", () =>{
  it("Se debe eliminar el usuario mediante su id", (done) => {
    chai.request(url)
    .delete('/users?id=2')
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar la eliminación del usuario porque hace falta el ID", (done) => {
    chai.request(url)
    .delete('/users?')
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })

  it("Se debe rechazar la eliminación del usuario porque el atributo id está mal escrito", (done) => {
    chai.request(url)
    .delete('/users?Id=36')
    .end(function(err, res){
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property("message");
      done();
    })
  })
})