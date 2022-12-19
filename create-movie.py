import json
import boto3

TABLE_NAME = 'YOUR_TABLE_NAME_HERE' # TYPE YOUR TABLE NAME HERE

def lambda_handler(event, context):
    db = boto3.client('dynamodb')
    
    db.put_item(
        TableName=TABLE_NAME,
        Item={
            "director": {
                "S": event['director']
            },
            "title": {
                "S": event['title']
            },
            "description": {
                "S": event['description']
            },
            "contentRating": {
                "S": event['contentRating']
            },
            "releaseYear": {
                "N": event['releaseYear']
            },
            "runTime": {
                "S": event['runTime']
            },
            "writers": {
                "L": [
                {
                    "S": event['writers'][0]
                },
                {
                    "S": event['writers'][1] if len(event['writers']) > 2 else '' 
                },
                {
                    "S": event['writers'][2] if len(event['writers']) > 3 else ''
                }
                ]
            },
            "actors": {
                "L": [
                {
                    "S": event['actors'][0]
                },
                {
                    "S": event['actors'][1] if len(event['actors']) > 2 else ''
                },
                {
                    "S": event['actors'][2] if len(event['actors']) > 3 else ''
                }
                ]
            },
            "imageURL": {
                "S": event['imageURL']
            }
    })
    return {
        'statusCode': 201
    }


