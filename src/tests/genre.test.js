const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Movie = require('../models/Movie');
require('../models');

let id;

test("GET/genres debe retornar los generos", async () => {
    const res = await request(app).get('/genres');
    //console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});
test("POST/debe crear un genre", async () => {
    const genre = {
        name: "Ficción",
    }
    const res = await request(app).post('/genres').send(genre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();

});
test("PUT/genres/:id debe actualizar un genre", async () => {
    const newGenre = {
        name: "Terror"
    }
    const res = await request(app).put(`/genres/${id}`).send(newGenre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(newGenre.name);
});

test("DELETE/genres/:id debe eliminar un genre", async () => {

    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
})