import json
import boto3
import re
import os
from datetime import datetime, timezone

# DynamoDB table name — must match what you create in the AWS console
TABLE_NAME = os.environ.get('TABLE_NAME', 'gns-waitlist')

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
table    = dynamodb.Table(TABLE_NAME)

# Allowed origins for CORS (add your custom domain when ready)
ALLOWED_ORIGINS = [
    'https://growthnetworksystem.com',
    'https://www.growthnetworksystem.com',
    'http://localhost',        # for local testing
    'http://127.0.0.1',
    'http://localhost:3000',
]

def cors_headers(origin):
    allowed = origin if origin in ALLOWED_ORIGINS else ALLOWED_ORIGINS[0]
    return {
        'Access-Control-Allow-Origin':  allowed,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Content-Type': 'application/json',
    }

def is_valid_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def lambda_handler(event, context):
    origin = (event.get('headers') or {}).get('origin', ALLOWED_ORIGINS[0])
    headers = cors_headers(origin)

    # Handle CORS preflight
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    try:
        body = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Invalid JSON'}),
        }

    email = (body.get('email') or '').strip().lower()
    lang  = body.get('lang', 'sv')   # 'sv' or 'en'

    # Validate
    if not email or not is_valid_email(email):
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Invalid email address'}),
        }

    # Save to DynamoDB
    now = datetime.now(timezone.utc).isoformat()
    try:
        table.put_item(
            Item={
                'email':      email,           # partition key
                'signedUpAt': now,             # sort key (ISO-8601)
                'lang':       lang,            # 'sv' or 'en'
                'source':     'landing-page',
            },
            # Silently ignore duplicate emails
            ConditionExpression='attribute_not_exists(email)',
        )
    except dynamodb.meta.client.exceptions.ConditionalCheckFailedException:
        # Email already registered — still return success to the user
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'Already registered'}),
        }
    except Exception as e:
        print(f'DynamoDB error: {e}')
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Internal server error'}),
        }

    print(f'New waitlist signup: {email} | lang={lang} | {now}')

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'message': 'Signed up successfully'}),
    }
