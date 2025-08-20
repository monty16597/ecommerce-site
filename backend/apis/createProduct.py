# createProduct.py
import json
import boto3
import uuid
from decimal import Decimal
import datetime

# Helper class to convert Decimal to float
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ecommerce-data')

def lambda_handler(event, context):
    """
    Creates a new product item in the DynamoDB table.
    It generates a unique ID and uses the new field names.
    """
    try:
        # Check for admin authentication via a simple, hardcoded check.
        # A more robust solution would use a proper auth service.
        auth_header = event.get('headers', {}).get('authorization')
        if not auth_header or auth_header != 'Basic YWRtaW46cGFzc3dvcmQ=':
            return {
                'statusCode': 401,
                'body': json.dumps({'error': 'Unauthorized'})
            }

        body = json.loads(event['body'])
        
        # Generate a unique ID for the new product
        product_id = str(uuid.uuid4())
        
        # Prepare the item for DynamoDB, using the new field names
        item = {
            'id': product_id,
            'ItemName': body['ItemName'],
            'price': Decimal(str(body['price'])),
            'category': body['category'],
            'description': body.get('description', ''),
            'thumbnailURL': body.get('thumbnailURL', 'https://placehold.co/400x300'),
            'images': body.get('images', []), # New list of images
            'addedAt': body.get('addedAt', datetime.datetime.utcnow().isoformat()),
            'featured': body.get('featured', False)
        }
        
        table.put_item(Item=item)
        
        return {
            'statusCode': 201,
            'body': json.dumps({'message': 'Product created successfully', 'productId': product_id})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }