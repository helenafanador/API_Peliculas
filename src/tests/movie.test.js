const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let id;

test("GET/movies debe retornar una movie", async () => {
    const res = await request(app).get('/movies');
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});
test("POST/debe crear una movie", async () => {
    const movie = {
        name: "Titanic",
        image: "",
        synopsis: "es una pelicula hermosa",
        releaseYear: "2023"
    }
    const res = await request(app)
        .post('/movies')
        .send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);

});

test("POST/movies/:id/actors debe crear los actors de una movie", async () => {
    const actor = await Actor.create({
        firstName: "Leonardo",
        lastName: "Di Caprio",
        nationality: "Americano",
        image: "",
        birthday: "1980/12/20"
    })
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
    await actor.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});
test("POST/movies/:id/directors debe crear los directors de una movie", async () => {
    const director = await Director.create({
        firstName: "Steven",
        lastName: "Spielberg",
        nationality: "Americano",
        image: "",
        birthday: "1946/12/18"
    })
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]);
    await director.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});
test("POST/movies/:id/genres debe crear los genres de una movie", async () => {
    const genre = await Genre.create({
        name: "Accion"
    })
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    await genre.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});
test("PUT/movies/:id debe actualizar un movie", async () => {
    const newMovie = {
        name: "hasta el final"
    }
    const res = await request(app)
        .put(`/movies/${id}`)
        .send(newMovie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(newMovie.name);

});
test("DELETE/movies/:id debe eliminar un movie", async () => {

    const res = await request(app)
        .delete(`/movies/${id}`);
    expect(res.status).toBe(204);
})