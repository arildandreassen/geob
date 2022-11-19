import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {faker} from '@faker-js/faker'
import {knex} from "knex";
import { env } from 'process';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const pg = knex({
        client: 'pg',
        connection: env.databaseString
      });

      const numberOfCountriesInTheWorld = 192
      const randomCountryIndex = Math.floor(Math.random() * numberOfCountriesInTheWorld)


    let response: APIGatewayProxyResult;
    try {
        const countryName = await pg('countries').offset(randomCountryIndex).limit(1)
        console.log(countryName)
        
        response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*", // Allow from anywhere 
                "Access-Control-Allow-Methods": "GET" // Allow only GET request 
            },
            body: JSON.stringify({
                countryName
            }),
        };
    } catch (err: unknown) {
        console.log(err);
        response = {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*", // Allow from anywhere 
                "Access-Control-Allow-Methods": "GET" // Allow only GET request 
            },
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }

    return response;
};
