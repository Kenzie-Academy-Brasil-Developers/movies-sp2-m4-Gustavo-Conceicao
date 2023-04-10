import { Client } from "pg";

const client: Client = new Client({
    user: "bruno",
    host: "localhost",
    port: 5432,
    password: "101010",
    database: "Entrega_Movies_S2",
})

const startDataBase = async (): Promise<void> => {
    await client.connect()
    console.log("Database Connected!")
}

export { 
    client, startDataBase
}