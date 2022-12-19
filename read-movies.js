const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const TABLE_NAME = 'YOUR_TABLE_NAME_HERE'; // Insert your table name here

const findAllMovies = async () => {
    const params = {
        TableName: TABLE_NAME
    }
    const movies = await db.scan(params).promise();
    return movies;
}

exports.handler = async () => {
    const movies = await findAllMovies();
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        },
        body: JSON.stringify(movies),
    };
    return response;
};
