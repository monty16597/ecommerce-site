# updateProduct.py
import json
import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ecommerce-data')

def lambda_handler(event, context):
    """
    Updates an existing product item in the DynamoDB table.
    It dynamically builds the update expression based on the provided fields.
    """
    try:
        # Check for admin authentication
        auth_header = event.get('headers', {}).get('Authorization')
        if not auth_header or auth_header != 'Basic YWRtaW46cGFzc3dvcmQ=':
            return {
                'statusCode': 401,
                'body': json.dumps({'error': 'Unauthorized'})
            }

        body = json.loads(event['body'])
        product_id = body.get('id')
        
        # Keys from the body that can be updated in DynamoDB
        allowed_keys = ['ItemName', 'price', 'category', 'thumbnailURL', 'images', 'description', 'featured']

        update_expression = "SET"
        expression_attribute_values = {}
        
        # Build the UpdateExpression and ExpressionAttributeValues dynamically
        for key, value in body.items():
            if key in allowed_keys:
                update_expression += f" {key} = :{key},"
                # Handle Decimal type for price
                if key == 'price':
                    expression_attribute_values[f':{key}'] = Decimal(str(value))
                else:
                    expression_attribute_values[f':{key}'] = value

        # Remove trailing comma
        update_expression = update_expression.rstrip(',')

        # Ensure there is something to update
        if not expression_attribute_values:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'No valid fields provided for update.'})
            }
        
        table.update_item(
            Key={'id': product_id},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Product updated successfully'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }