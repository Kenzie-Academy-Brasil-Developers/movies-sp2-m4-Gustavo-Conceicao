import { Request, Response } from "express"
import { QueryConfig } from "pg"
import format from "pg-format"
import { client } from "./database"
import { IMovieRequest } from "./interfaces"

const createMovieLogic = async (request: Request, response: Response): Promise<Response> => {
    
    const requestData: IMovieRequest = request.body

    const queryString: string = `
        INSERT INTO 
	        movies (name, category, duration, price)
	    VALUES 
            ($1, $2, $3, $4)
        RETURNING *; 
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: Object.values(requestData)
    }

    const queryResult = await client.query(queryConfig)
    const newResponse = queryResult.rows[0]

    return response.status(201).json(newResponse)
}

const listAllMoviesLogic = async (request: Request, response: Response): Promise<Response> => {

    const queryString: string = `
        SELECT
            *
        FROM 
            movies;
    `
    const queryResult = await client.query(queryString)

    return response.status(200).json(queryResult.rows)
}

const listMovieLogic = async (request: Request, response: Response): Promise<Response> => {

    const id: number = parseInt(request.params.id)

    const queryString: string = `
        SELECT
            *
        FROM 
            movies
        WHERE 
            $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString, 
        values: [id]
    }


    const queryResult = await client.query(queryConfig)

    return response.status(200).json(queryResult.rows[0])
}

const updateMovieLogic = async (request: Request, response: Response): Promise<Response> => {

    const id: number = parseInt(request.params.id)
    const dataRequest = Object.values(request.body)
    const keysRequest = Object.keys(request.body)

    const queryString: string = format(`
        UPDATE
            movies
        SET(%I) = ROW(%L) 
        WHERE 
            id = $1
        RETURNING *;
    `,
        keysRequest,
        dataRequest

    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    } 

    const queryResult = await client.query(queryConfig)

    return response.status(200).json(queryResult.rows[0])
}

const deleteMovieLogic = async (request: Request, response: Response): Promise<Response> => {

    const id: number = parseInt(request.params.id)

    const queryString: string = `
        DELETE FROM
            movies
        WHERE 
            id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    await client.query(queryConfig)

    return response.status(204).send()
}

export { createMovieLogic, listAllMoviesLogic, listMovieLogic, updateMovieLogic, deleteMovieLogic }