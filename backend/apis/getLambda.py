import json
import boto3
from decimal import Decimal
import os
import datetime

# DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('TABLE_NAME', 'ecommerce-data')
table = dynamodb.Table(table_name)
gsi_name = 'CategoryIndex'

# Helper class to convert a DynamoDB item to JSON-friendly format
# This is necessary because DynamoDB returns numbers as Decimal objects.
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    try:
        # Check for query string parameters to determine the request type
        query_params = event.get('queryStringParameters', {})
        
        # Scenario 1: Fetch a single product by ID
        if query_params and 'id' in query_params:
            product_id = query_params['id']
            response = table.get_item(
                Key={
                    'id': product_id
                }
            )
            item = response.get('Item')
            
            if not item:
                return {
                    'statusCode': 404,
                    'body': json.dumps({'message': 'Product not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                },
                'body': json.dumps(item, cls=DecimalEncoder)
            }
            
        # Scenario 2: Fetch products by category
        elif query_params and 'category' in query_params:
            category = query_params['category']
            response = table.query(
                IndexName=gsi_name,
                KeyConditionExpression=boto3.dynamodb.conditions.Key('category').eq(category)
            )
            items = response.get('Items', [])
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                },
                'body': json.dumps(items, cls=DecimalEncoder)
            }

        # Scenario 3: Fetch featured products
        elif query_params and 'featured' in query_params and query_params['featured'].lower() == 'true':
            response = table.scan(
                FilterExpression=boto3.dynamodb.conditions.Attr('featured').eq(True)
            )
            items = response.get('Items', [])
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                },
                'body': json.dumps(items, cls=DecimalEncoder)
            }

        # Scenario 4: Fetch newly added products (last 10)
        elif query_params and 'newlyAdded' in query_params and query_params['newlyAdded'].lower() == 'true':
            # This is a full table scan. For large tables, a dedicated GSI with 'addedAt' as the sort key would be more efficient.
            response = table.scan()
            items = response.get('Items', [])
            
            # Sort items by 'addedAt' descending and get the first 10
            items.sort(key=lambda x: x.get('addedAt', '1970-01-01T00:00:00Z'), reverse=True)
            newly_added_items = items[:10]
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                },
                'body': json.dumps(newly_added_items, cls=DecimalEncoder)
            }

        # Default: If no specific query parameter is provided, return all products
        else:
            response = table.scan()
            items = response.get('Items', [])
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                },
                'body': json.dumps(items, cls=DecimalEncoder)
            }
        
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': json.dumps({'message': 'Internal Server Error', 'error': str(e)})
        }
