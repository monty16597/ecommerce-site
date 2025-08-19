aws iam create-role \
    --role-name ecommerce-lambdas \
    --assume-role-policy-document file://trust-policy.json

aws iam attach-role-policy \
    --role-name ecommerce-lambdas \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

aws iam put-role-policy \
    --role-name ecommerce-lambdas \
    --policy-name DynamoDBReadPolicy \
    --policy-document file://policy.json

aws lambda create-function \
    --function-name EcommerceGetProductsFunction \
    --runtime python3.9 \
    --role arn:aws:iam::339035549356:role/ecommerce-lambdas \
    --handler getLambda.lambda_handler \
    --zip-file fileb://lambda_function.zip \
    --region ca-central-1

aws lambda create-function-url-config \
    --function-name EcommerceGetProductsFunction \
    --auth-type NONE \
    --cors '{"AllowOrigins":["*"],"AllowMethods":["*"]}'

aws lambda add-permission \
    --function-name EcommerceGetProductsFunction \
    --statement-id AllowPublicAccess \
    --action "lambda:InvokeFunctionUrl" \
    --principal "*" \
    --function-url-auth-type NONE \
    --region ca-central-1

# https://sqkdwhelxkfjod7vtn5xyxm3q40hhfcm.lambda-url.ca-central-1.on.aws/

curl -X GET 'https://sqkdwhelxkfjod7vtn5xyxm3q40hhfcm.lambda-url.ca-central-1.on.aws/?category=Cloths'
curl -X GET 'https://sqkdwhelxkfjod7vtn5xyxm3q40hhfcm.lambda-url.ca-central-1.on.aws/?featured=true'
