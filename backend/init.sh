# This file contains the updated AWS CLI commands to ingest data into your DynamoDB table
# with the new schema, including ItemName, thumbnailURL, description, and images.

# Db Table Creation (No Change)
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

# Add Cloth 1 (featured)
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "1"}, "ItemName": {"S": "Cloth 1"}, "price": {"N": "25.99"}, "category": {"S": "cloth"}, "description": {"S": "A comfortable and stylish piece of clothing."}, "thumbnailURL": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+1"}, "images": {"L": []}, "addedAt": {"S": "2024-05-10T10:00:00Z"}, "featured": {"BOOL": true}}' \
    --region ca-central-1

# Add Cloth 2
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "2"}, "ItemName": {"S": "Cloth 2"}, "price": {"N": "59.50"}, "category": {"S": "cloth"}, "description": {"S": "Perfect for a casual day out."}, "thumbnailURL": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+2"}, "images": {"L": []}, "addedAt": {"S": "2024-05-12T11:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Cloth 3 (featured)
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "3"}, "ItemName": {"S": "Cloth 3"}, "price": {"N": "45.00"}, "category": {"S": "cloth"}, "description": {"S": "A versatile item for any wardrobe."}, "thumbnailURL": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+3"}, "images": {"L": []}, "addedAt": {"S": "2024-05-14T12:00:00Z"}, "featured": {"BOOL": true}}' \
    --region ca-central-1

# Add Cloth 4 (featured)
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "4"}, "ItemName": {"S": "Cloth 4"}, "price": {"N": "35.75"}, "category": {"S": "cloth"}, "description": {"S": "High-quality fabric for long-lasting wear."}, "thumbnailURL": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Cloth+4"}, "images": {"L": []}, "addedAt": {"S": "2024-05-16T13:00:00Z"}, "featured": {"BOOL": true}}' \
    --region ca-central-1

# # Add Luxury Cotton Bedsheet Set
# aws dynamodb put-item \
#     --table-name ecommerce-data \
#     --item '{"id": {"S": "5"}, "ItemName": {"S": "Luxury Cotton Bedsheet Set"}, "price": {"N": "79.99"}, "category": {"S": "bed"}, "description": {"S": "Soft and luxurious cotton for a great night's sleep."}, "thumbnailURL": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+1"}, "images": {"L": []}, "addedAt": {"S": "2024-05-10T11:00:00Z"}, "featured": {"BOOL": false}}' \
#     --region ca-central-1

# Add Silk Blend Bedding (featured)
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "6"}, "ItemName": {"S": "Silk Blend Bedding"}, "price": {"N": "129.50"}, "category": {"S": "bed"}, "description": {"S": "Experience ultimate comfort with this silk-blend set."}, "thumbnailURL": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+2"}, "images": {"L": []}, "addedAt": {"S": "2024-05-12T12:00:00Z"}, "featured": {"BOOL": true}}' \
    --region ca-central-1

# Add Striped Duvet Cover
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "7"}, "ItemName": {"S": "Striped Duvet Cover"}, "price": {"N": "59.99"}, "category": {"S": "bed"}, "description": {"S": "Modern and stylish striped duvet cover."}, "thumbnailURL": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+3"}, "images": {"L": []}, "addedAt": {"S": "2024-05-14T13:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Solid Color Comforter
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "8"}, "ItemName": {"S": "Solid Color Comforter"}, "price": {"N": "89.00"}, "category": {"S": "bed"}, "description": {"S": "A cozy and warm comforter for your bed."}, "thumbnailURL": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+4"}, "images": {"L": []}, "addedAt": {"S": "2024-05-16T14:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Floral Pattern Sheet
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "9"}, "ItemName": {"S": "Floral Pattern Sheet"}, "price": {"N": "65.75"}, "category": {"S": "bed"}, "description": {"S": "Delicate floral pattern to brighten your room."}, "thumbnailURL": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+5"}, "images": {"L": []}, "addedAt": {"S": "2024-05-18T15:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Geometric Print Set
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "10"}, "ItemName": {"S": "Geometric Print Set"}, "price": {"N": "95.25"}, "category": {"S": "bed"}, "description": {"S": "Bold geometric design for a modern look."}, "thumbnailURL": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Bedsheet+6"}, "images": {"L": []}, "addedAt": {"S": "2024-05-20T16:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Stylish Jacket
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "11"}, "ItemName": {"S": "Stylish Jacket"}, "price": {"N": "85.00"}, "category": {"S": "cloth"}, "description": {"S": "A jacket that combines style and comfort."}, "thumbnailURL": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Jacket"}, "images": {"L": []}, "addedAt": {"S": "2024-05-18T14:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Wool Scarf
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "12"}, "ItemName": {"S": "Wool Scarf"}, "price": {"N": "29.99"}, "category": {"S": "cloth"}, "description": {"S": "Stay warm and cozy with this soft wool scarf."}, "thumbnailURL": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Scarf"}, "images": {"L": []}, "addedAt": {"S": "2024-05-20T15:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Leather Belt
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "13"}, "ItemName": {"S": "Leather Belt"}, "price": {"N": "49.99"}, "category": {"S": "cloth"}, "description": {"S": "A classic leather belt for any outfit."}, "thumbnailURL": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Belt"}, "images": {"L": []}, "addedAt": {"S": "2024-05-22T16:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Graphic Hoodie
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "14"}, "ItemName": {"S": "Graphic Hoodie"}, "price": {"N": "65.00"}, "category": {"S": "cloth"}, "description": {"S": "Show off your style with this unique graphic hoodie."}, "thumbnailURL": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Hoodie"}, "images": {"L": []}, "addedAt": {"S": "2024-05-24T17:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1
    
# Add Waterproof Mattress Protector
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "21"}, "ItemName": {"S": "Waterproof Mattress Protector"}, "price": {"N": "39.99"}, "category": {"S": "bed"}, "description": {"S": "Protects your mattress from spills and stains."}, "thumbnailURL": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Protector"}, "images": {"L": []}, "addedAt": {"S": "2024-05-25T18:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1
    
# Add Linen Pillowcases
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "22"}, "ItemName": {"S": "Linen Pillowcases"}, "price": {"N": "22.50"}, "category": {"S": "bed"}, "description": {"S": "Soft and breathable linen pillowcases."}, "thumbnailURL": {"S": "https://placehold.co/400x300/E5E7EB/4B5563?text=Pillowcases"}, "images": {"L": []}, "addedAt": {"S": "2024-05-26T19:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Bluetooth Speaker
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "23"}, "ItemName": {"S": "Bluetooth Speaker"}, "price": {"N": "55.00"}, "category": {"S": "Electronics"}, "description": {"S": "Portable speaker for high-quality audio on the go."}, "thumbnailURL": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Speaker"}, "images": {"L": []}, "addedAt": {"S": "2024-05-27T10:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Wireless Earbuds
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "24"}, "ItemName": {"S": "Wireless Earbuds"}, "price": {"N": "79.99"}, "category": {"S": "Electronics"}, "description": {"S": "Listen to music wirelessly with these comfortable earbuds."}, "thumbnailURL": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Earbuds"}, "images": {"L": []}, "addedAt": {"S": "2024-05-27T11:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Smart Lamp
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "25"}, "ItemName": {"S": "Smart Lamp"}, "price": {"N": "49.99"}, "category": {"S": "Electronics"}, "description": {"S": "Control your lighting with your phone or voice."}, "thumbnailURL": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Lamp"}, "images": {"L": []}, "addedAt": {"S": "2024-05-27T12:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1

# Add Digital Photo Frame
aws dynamodb put-item \
    --table-name ecommerce-data \
    --item '{"id": {"S": "26"}, "ItemName": {"S": "Digital Photo Frame"}, "price": {"N": "99.00"}, "category": {"S": "Electronics"}, "description": {"S": "Display your favorite memories with this sleek frame."}, "thumbnailURL": {"S": "https://placehold.co/400x300/F0F4F8/3B82F6?text=Frame"}, "images": {"L": []}, "addedAt": {"S": "2024-05-27T13:00:00Z"}, "featured": {"BOOL": false}}' \
    --region ca-central-1
