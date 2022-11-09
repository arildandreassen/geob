import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {faker} from '@faker-js/faker'
import {knex} from "knex";
import { env } from 'process';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const pg = knex({
        client: 'pg',
        connection: env.databaseString
      });

    const country_name = faker.address.country().toLowerCase()

    let response: APIGatewayProxyResult;
    try {
        await pg('countries').insert({country_name, created_at: new Date(), updated_at: new Date()})
        response = {
            statusCode: 200,
            body: JSON.stringify({
                country_name
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
