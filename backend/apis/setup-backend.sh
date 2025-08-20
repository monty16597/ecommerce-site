#!/bin/bash
set -e

# ==============================================================================
# SCRIPT VARIABLES
# You can modify these values as needed.
# ==============================================================================
REGION="ca-central-1"
ACCOUNT_ID="339035549356"
ROLE_NAME="ecommerce-lambdas"
POLICY_NAME="DynamoDBCRUDPolicy"
TABLE_NAME="ecommerce-data"

PROJECT_NAME="ecommerce-backend"
GET_FUNCTION="${PROJECT_NAME}-GetProductsFunction"
CREATE_FUNCTION="${PROJECT_NAME}-CreateProductFunction"
UPDATE_FUNCTION="${PROJECT_NAME}-UpdateProductFunction"
DELETE_FUNCTION="${PROJECT_NAME}-DeleteProductFunction"

# ==============================================================================
# IAM POLICIES (Embedded as strings)
# ==============================================================================
TRUST_POLICY='{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}'

CRUD_POLICY='{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:GetItem",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:PutItem",
                "dynamodb:UpdateItem",
                "dynamodb:DeleteItem"
            ],
            "Resource": [
                "arn:aws:dynamodb:'"$REGION"':'"$ACCOUNT_ID"':table/'"$TABLE_NAME"'",
                "arn:aws:dynamodb:'"$REGION"':'"$ACCOUNT_ID"':table/'"$TABLE_NAME"'/index/CategoryIndex"
            ]
        }
    ]
}'

# ==============================================================================
# SCRIPT EXECUTION
# ==============================================================================

# Create or update IAM role and policy
echo "Creating/Updating IAM role and policies..."
aws --no-cli-pager --no-cli-auto-prompt iam create-role --role-name "$ROLE_NAME" --assume-role-policy-document "$TRUST_POLICY" || \
aws --no-cli-pager --no-cli-auto-prompt iam update-assume-role-policy --role-name "$ROLE_NAME" --policy-document "$TRUST_POLICY"
aws --no-cli-pager --no-cli-auto-prompt iam put-role-policy --role-name "$ROLE_NAME" --policy-name "$POLICY_NAME" --policy-document "$CRUD_POLICY"
ROLE_ARN="arn:aws:iam::$ACCOUNT_ID:role/$ROLE_NAME"
echo "IAM role created/updated successfully."

# --- Create Lambda Functions ---
echo "Creating Lambda functions..."

# Package and deploy GetProductsFunction
zip -q "$GET_FUNCTION".zip getProducts.py
aws --no-cli-pager --no-cli-auto-prompt lambda create-function \
    --function-name "$GET_FUNCTION" \
    --runtime python3.9 \
    --role "$ROLE_ARN" \
    --handler getProducts.lambda_handler \
    --zip-file fileb://"$GET_FUNCTION".zip \
    --region "$REGION" || \
aws --no-cli-pager --no-cli-auto-prompt lambda update-function-code \
    --function-name "$GET_FUNCTION" \
    --zip-file fileb://"$GET_FUNCTION".zip \
    --region "$REGION"
rm "$GET_FUNCTION".zip

# Package and deploy CreateProductFunction
zip -q "$CREATE_FUNCTION".zip createProduct.py
aws --no-cli-pager --no-cli-auto-prompt lambda create-function \
    --function-name "$CREATE_FUNCTION" \
    --runtime python3.9 \
    --role "$ROLE_ARN" \
    --handler createProduct.lambda_handler \
    --zip-file fileb://"$CREATE_FUNCTION".zip \
    --region "$REGION" || \
aws --no-cli-pager --no-cli-auto-prompt lambda update-function-code \
    --function-name "$CREATE_FUNCTION" \
    --zip-file fileb://"$CREATE_FUNCTION".zip \
    --region "$REGION"
rm "$CREATE_FUNCTION".zip

# Package and deploy UpdateProductFunction
zip -q "$UPDATE_FUNCTION".zip updateProduct.py
aws --no-cli-pager --no-cli-auto-prompt lambda create-function \
    --function-name "$UPDATE_FUNCTION" \
    --runtime python3.9 \
    --role "$ROLE_ARN" \
    --handler updateProduct.lambda_handler \
    --zip-file fileb://"$UPDATE_FUNCTION".zip \
    --region "$REGION" || \
aws --no-cli-pager --no-cli-auto-prompt lambda update-function-code \
    --function-name "$UPDATE_FUNCTION" \
    --zip-file fileb://"$UPDATE_FUNCTION".zip \
    --region "$REGION"
rm "$UPDATE_FUNCTION".zip

# Package and deploy DeleteProductFunction
zip -q "$DELETE_FUNCTION".zip deleteProduct.py
aws --no-cli-pager --no-cli-auto-prompt lambda create-function \
    --function-name "$DELETE_FUNCTION" \
    --runtime python3.9 \
    --role "$ROLE_ARN" \
    --handler deleteProduct.lambda_handler \
    --zip-file fileb://"$DELETE_FUNCTION".zip \
    --region "$REGION" || \
aws --no-cli-pager --no-cli-auto-prompt lambda update-function-code \
    --function-name "$DELETE_FUNCTION" \
    --zip-file fileb://"$DELETE_FUNCTION".zip \
    --region "$REGION"
rm "$DELETE_FUNCTION".zip

echo "All Lambda functions created successfully."

# --- Configure Function URLs and Permissions ---
echo "Configuring public function URLs..."

create_url() {
    local func_name=$1
    local url_data=$(aws --no-cli-pager --no-cli-auto-prompt lambda create-function-url-config \
        --function-name "$func_name" \
        --auth-type NONE \
        --cors '{"AllowOrigins":["*"],"AllowMethods":["*"]}' \
        --region "$REGION" 2>/dev/null)

    if [ -z "$url_data" ]; then
        url_data=$(aws --no-cli-pager --no-cli-auto-prompt lambda get-function-url-config --function-name "$func_name" --region "$REGION" 2>/dev/null)
    fi
    
    local url=$(echo "$url_data" | jq -r '.FunctionUrl')
    
    aws --no-cli-pager --no-cli-auto-prompt lambda add-permission \
        --function-name "$func_name" \
        --statement-id AllowPublicAccess \
        --action "lambda:InvokeFunctionUrl" \
        --principal "*" \
        --function-url-auth-type NONE \
        --region "$REGION" > /dev/null 2>&1
    
    echo "$url"
}

GET_URL=$(create_url "$GET_FUNCTION")
CREATE_URL=$(create_url "$CREATE_FUNCTION")
UPDATE_URL=$(create_url "$UPDATE_FUNCTION")
DELETE_URL=$(create_url "$DELETE_FUNCTION")

echo "All function URLs configured successfully."
echo ""

# ==============================================================================
# FINAL OUTPUT
# ==============================================================================

echo "✅ Your backend is ready! Use the following URLs in your frontend:"
echo ""
echo "------------------------------------------------------------------------"
echo "GET Products URL: $GET_URL"
echo "  - Use with ?category=Cloths or ?featured=true for filtering."
echo "  - Use with ?id=<product_id> for single item."
echo ""
echo "POST (Create) URL: $CREATE_URL"
echo "  - Sends JSON payload to add a new product."
echo ""
echo "PUT (Update) URL: $UPDATE_URL"
echo "  - Takes product_id in path and JSON payload to update."
echo ""
echo "DELETE URL: $DELETE_URL"
echo "  - Takes product_id in path to delete."
echo "------------------------------------------------------------------------"


# GET Products URL: https://7b23l62uacfekfihmefunsv2eu0gavxv.lambda-url.ca-central-1.on.aws/
#   - Use with ?category=Cloths or ?category=Bedsheets or ?featured=true or ?newlyAdded=true for filtering.
#   - Use with ?id=<product_id> for single item.

# POST (Create) URL: https://c4di5o2y7hqcilnxttsaokqp2y0xylvb.lambda-url.ca-central-1.on.aws/
#   - Sends JSON payload to add a new product.

# PUT (Update) URL: https://lq7ukiqf3qf4ormufgutcwqn2m0urdch.lambda-url.ca-central-1.on.aws/
#   - Takes product_id in path and JSON payload to update.

# DELETE URL: https://sxrwmvza666okw37qjmephwulu0vhbip.lambda-url.ca-central-1.on.aws/
#   - Takes product_id in path to delete.

# JSON Payload is 
# {"addedAt": "2024-05-10T10:00:00Z", "image": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+1", "category": "Cloths", "price": 25.99, "id": "1", "name": "Cloth 1", "featured": true}