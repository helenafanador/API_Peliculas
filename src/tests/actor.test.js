const request = require('supertest');
const app = require('../app');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
const Movie = require('../models/Movie');
require('../models');

let id;

test("GET/actors debe retornar status 200", async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});
test("POST/debe crear un actor", async () => {
    const actor = {
        firstName: "Helen",
        lastName: "Afanador",
        nationality: "Venezolana",
        image: "",
        birthday: "1990/02/27"
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});
test("PUT/actors/:id debe actualizar un actor", async () => {
    const newActor = {
        firstName: "Salma"
    }
    const res = await request(app).put(`/actors/${id}`).send(newActor);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(newActor.name);
});

test("DELETE/actors/:id debe eliminar un actor", async () => {

    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
})