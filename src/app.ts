import express, { Application } from "express";
import { startDataBase } from "./database";
import { createMovieLogic, deleteMovieLogic, listAllMoviesLogic, listMovieLogic, updateMovieLogic } from "./logic";
import { ensureMovieExists } from "./middlewares";

const app: Application = express()
app.use(express.json())

app.post("/movies", createMovieLogic)
app.get("/movies", listAllMoviesLogic)
app.get("/movies/:id", ensureMovieExists, listMovieLogic)
app.patch("/movies/:id", ensureMovieExists, updateMovieLogic)
app.delete("/movies/:id", ensureMovieExists, deleteMovieLogic)


app.listen(3000, async () => {
    await startDataBase()
    console.log("Server is running!")
})