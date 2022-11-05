import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {faker} from '@faker-js/faker'
import {knex} from "knex";

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const pg = knex({
        client: 'pg',
        connection: {
            host: 'host.docker.internal',
            port: 5432,
            user: 'postgres', 
            password: 'password',
            database: 'postgres'
        }
      });

    const country_name = faker.address.country()
    await pg('countries').insert({country_name})

      


    let response: APIGatewayProxyResult;
    try {
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
            }),
        };
    } catch (err: unknown) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }

    return response;
};
