# deleteProduct.py
import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ecommerce-data')

def lambda_handler(event, context):
    """
    Deletes a product item from the DynamoDB table based on its ID.
    """
    try:
        # Check for admin authentication
        auth_header = event.get('headers', {}).get('Authorization')
        if not auth_header or auth_header != 'Basic YWRtaW46cGFzc3dvcmQ=':
            return {
                'statusCode': 401,
                'body': json.dumps({'error': 'Unauthorized'})
            }
            
        product_id = event['pathParameters']['id']
        
        table.delete_item(Key={'id': product_id})
        
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Product deleted successfully'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }