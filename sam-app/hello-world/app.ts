import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {faker} from '@faker-js/faker'
import {knex} from "knex";
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

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

    await pg('countries').insert({country_name:'new', id:4})

      

    console.log(faker.address.country())
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
