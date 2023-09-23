const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
require('../models');

let id;

test("GET/directors debe retornar un director", async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});
test("POST/debe crear un director", async () => {
    const director = {
        firstName: "Diego ",
        lastName: "Vicentini",
        nationality: "Venezolano",
        image: "",
        birthay: "12/09/1986"
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(400);
    expect(res.body).toBeDefined();
});
test("PUT/directors/:id debe actualizar un director", async () => {
    const newDirector = {
        firstName: "Director"
    }
    const res = await request(app)
        .put(`/directors/${id}`)
        .send(newDirector);
    expect(res.status).toBe(400);
    expect(res.body.name).toBe(newDirector.name);
});

test("DELETE/directors/:id debe eliminar un director", async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(400);
})