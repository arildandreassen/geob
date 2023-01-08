import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {knex} from "knex";
import { env } from 'process';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const headers = {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
        "Access-Control-Allow-Methods": "GET" // Allow only GET request 
    }

    const pg = knex({
        client: 'pg',
        connection: env.databaseString
    });

    let response: APIGatewayProxyResult;
    try {
        
        const body = JSON.parse(event.body!)

        const highScores = await pg('highscores').insert(body).returning(['name', 'score'])
        
        response = {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                highScores
            }),
        };
    } catch (err: unknown) {
        console.log(err);
        response = {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }

    return response;
};
