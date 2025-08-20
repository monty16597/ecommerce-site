# getProduct.py
import json
import boto3
from decimal import Decimal

class DecimalEncoder(json.JSONEncoder):
    """
    Helper class to convert Decimal objects to floats for JSON serialization.
    """
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ecommerce-data')

def lambda_handler(event, context):
    """
    Retrieves product data based on query parameters (category, featured, newly added, or a specific ID).
    If no query parameters are provided, it returns all products.
    """
    try:
        query_params = event.get('queryStringParameters', {})
        items = []

        if query_params:
            if 'category' in query_params:
                response = table.query(
                    IndexName='CategoryIndex',
                    KeyConditionExpression='category = :cat',
                    ExpressionAttributeValues={':cat': query_params['category']}
                )
                items = response.get('Items', [])
            elif 'featured' in query_params and query_params['featured'].lower() == 'true':
                response = table.scan(
                    FilterExpression='featured = :val',
                    ExpressionAttributeValues={':val': True}
                )
                items = response.get('Items', [])
            elif 'newlyAdded' in query_params and query_params['newlyAdded'].lower() == 'true':
                # Perform a full scan and sort the results by 'addedAt'
                scan_response = table.scan()
                all_items = scan_response.get('Items', [])
                
                # Sort items by 'addedAt' in descending order
                sorted_items = sorted(all_items, key=lambda x: x.get('addedAt', '1970-01-01T00:00:00Z'), reverse=True)
                
                # Take the top 10 newly added items
                items = sorted_items[:10]
            elif 'id' in query_params:
                response = table.get_item(Key={'id': query_params['id']})
                item = response.get('Item')
                if item:
                    return {
                        'statusCode': 200,
                        'body': json.dumps(item, cls=DecimalEncoder)
                    }
                else:
                    return {
                        'statusCode': 404,
                        'body': json.dumps({'message': 'Product not found'})
                    }
            else:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': 'Invalid query parameter'})
                }
        else:
            response = table.scan()
            items = response.get('Items', [])

        return {
            'statusCode': 200,
            'body': json.dumps(items, cls=DecimalEncoder)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }