import express, { Application } from "express";
import { startDataBase } from "./database";
import { createMovieLogic, deleteMovieLogic, listAllMoviesLogic, listMovieLogic, updateMovieLogic } from "./logic";
import { ensureMovieExists, ensureNameExists } from "./middlewares";

const app: Application = express()
app.use(express.json())

app.post("/movies", ensureNameExists, createMovieLogic)
app.get("/movies", listAllMoviesLogic)
app.get("/movies/:id", ensureMovieExists, listMovieLogic)
app.patch("/movies/:id", ensureMovieExists, ensureNameExists, updateMovieLogic)
app.delete("/movies/:id", ensureMovieExists, deleteMovieLogic)


app.listen(3000, async () => {
    await startDataBase()
    console.log("Server is running!")
})