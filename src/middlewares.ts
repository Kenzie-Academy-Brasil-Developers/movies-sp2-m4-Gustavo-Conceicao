import { Request, Response, NextFunction } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";

const ensureMovieExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(request.params.id);

  const queryString = `
        SELECT 
            *
        FROM
            movies
        WHERE 
            id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult = await client.query(queryConfig);

  if (!queryResult.rowCount) {
    return response.status(404).json({
      message: "Movie not found!",
    });
  }

  return next();
};

const ensureNameExists = async (request: Request, response: Response, next: NextFunction) => {
  const bodyRequest = request.body

  const queryString: string = `
      SELECT 
          name
      FROM
          movies
      WHERE 
          movies.name = $1;
  `

  const queryConfig: QueryConfig = {
      text: queryString,
      values: [bodyRequest.name]
  }

  const queryResult = await client.query(queryConfig)

  if(queryResult.rows[0]){
      return response.status(409).json({
          message: "Name already exists!"
      })
  }

  return next()
}



export { ensureMovieExists, ensureNameExists };
