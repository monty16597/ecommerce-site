# Db
aws dynamodb create-table \
    --table-name ecommerce-data \  
    --attribute-definitions \                                   
        AttributeName=id,AttributeType=S \        
        AttributeName=category,AttributeType=S \                       
    --key-schema \      
        AttributeName=id,KeyType=HASH \ 
    --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"CategoryIndex\",
                \"KeySchema\": [{\"AttributeName\":\"category\",\"KeyType\":\"HASH\"}],
                \"Projection\": {\"ProjectionType\":\"ALL\"},
                \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 5,\"WriteCapacityUnits\": 5}
            }
        ]" \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --region ca-central-1

# data

# Add Cloth 1 (featured)
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "1"}, "name": {"S": "Cloth 1"}, "price": {"N": "25.99"}, "category": {"S": "Cloths"}, "image": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+1"}, "addedAt": {"S": "2024-05-10T10:00:00Z"}, "featured": {"BOOL": true}}' \
    --region ca-central-1

# Add Cloth 2
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "2"}, "name": {"S": "Cloth 2"}, "price": {"N": "59.50"}, "category": {"S": "Cloths"}, "image": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+2"}, "addedAt": {"S": "2024-05-12T11:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Cloth 3 (featured)
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "3"}, "name": {"S": "Cloth 3"}, "price": {"N": "45.00"}, "category": {"S": "Cloths"}, "image": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+3"}, "addedAt": {"S": "2024-05-14T12:00:00Z"}, "featured": {"BOOL": true}}' \
    --region ca-central-1

# Add Cloth 4 (featured)
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "4"}, "name": {"S": "Cloth 4"}, "price": {"N": "35.75"}, "category": {"S": "Cloths"}, "image": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+4"}, "addedAt": {"S": "2024-05-16T13:00:00Z"}, "featured": {"BOOL": true}}' \
    --region ca-central-1

# Add Luxury Cotton Bedsheet Set
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "5"}, "name": {"S": "Luxury Cotton Bedsheet Set"}, "price": {"N": "79.99"}, "category": {"S": "Bedsheets"}, "image": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+1"}, "addedAt": {"S": "2024-05-10T11:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Silk Blend Bedding (featured)
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "6"}, "name": {"S": "Silk Blend Bedding"}, "price": {"N": "129.50"}, "category": {"S": "Bedsheets"}, "image": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+2"}, "addedAt": {"S": "2024-05-12T12:00:00Z"}, "featured": {"BOOL": true}}' \
    --region ca-central-1

# Add Striped Duvet Cover
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "7"}, "name": {"S": "Striped Duvet Cover"}, "price": {"N": "59.99"}, "category": {"S": "Bedsheets"}, "image": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+3"}, "addedAt": {"S": "2024-05-14T13:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Solid Color Comforter
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "8"}, "name": {"S": "Solid Color Comforter"}, "price": {"N": "89.00"}, "category": {"S": "Bedsheets"}, "image": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+4"}, "addedAt": {"S": "2024-05-16T14:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Floral Pattern Sheet
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "9"}, "name": {"S": "Floral Pattern Sheet"}, "price": {"N": "65.75"}, "category": {"S": "Bedsheets"}, "image": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+5"}, "addedAt": {"S": "2024-05-18T15:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Geometric Print Set
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "10"}, "name": {"S": "Geometric Print Set"}, "price": {"N": "95.25"}, "category": {"S": "Bedsheets"}, "image": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+6"}, "addedAt": {"S": "2024-05-20T16:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Stylish Jacket
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "11"}, "name": {"S": "Stylish Jacket"}, "price": {"N": "85.00"}, "category": {"S": "Cloths"}, "image": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Jacket"}, "addedAt": {"S": "2024-05-18T14:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Wool Scarf
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "12"}, "name": {"S": "Wool Scarf"}, "price": {"N": "29.99"}, "category": {"S": "Cloths"}, "image": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Scarf"}, "addedAt": {"S": "2024-05-20T15:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Leather Belt
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "13"}, "name": {"S": "Leather Belt"}, "price": {"N": "49.99"}, "category": {"S": "Cloths"}, "image": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Belt"}, "addedAt": {"S": "2024-05-22T16:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Graphic Hoodie
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "14"}, "name": {"S": "Graphic Hoodie"}, "price": {"N": "65.00"}, "category": {"S": "Cloths"}, "image": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Hoodie"}, "addedAt": {"S": "2024-05-24T17:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1
    
# Add Waterproof Mattress Protector
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "21"}, "name": {"S": "Waterproof Mattress Protector"}, "price": {"N": "39.99"}, "category": {"S": "Bedsheets"}, "image": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Protector"}, "addedAt": {"S": "2024-05-25T18:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1
    
# Add Linen Pillowcases
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "22"}, "name": {"S": "Linen Pillowcases"}, "price": {"N": "22.50"}, "category": {"S": "Bedsheets"}, "image": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Pillowcases"}, "addedAt": {"S": "2024-05-26T19:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Bluetooth Speaker
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "23"}, "name": {"S": "Bluetooth Speaker"}, "price": {"N": "55.00"}, "category": {"S": "Electronics"}, "image": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Speaker"}, "addedAt": {"S": "2024-05-27T10:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Wireless Earbuds
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "24"}, "name": {"S": "Wireless Earbuds"}, "price": {"N": "79.99"}, "category": {"S": "Electronics"}, "image": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Earbuds"}, "addedAt": {"S": "2024-05-27T11:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Smart Lamp
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "25"}, "name": {"S": "Smart Lamp"}, "price": {"N": "49.99"}, "category": {"S": "Electronics"}, "image": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Lamp"}, "addedAt": {"S": "2024-05-27T12:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Digital Photo Frame
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "26"}, "name": {"S": "Digital Photo Frame"}, "price": {"N": "99.00"}, "category": {"S": "Electronics"}, "image": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Frame"}, "addedAt": {"S": "2024-05-27T13:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1