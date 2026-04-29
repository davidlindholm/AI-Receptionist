#!/bin/bash
# =============================================================
#  Growth Network System — AWS Setup Script
#  Run each section one at a time so you can check the output.
#  Region: us-west-2 (Oregon)
# =============================================================

set -e  # stop on any error
REGION="us-west-2"
TABLE_NAME="gns-waitlist"
FUNCTION_NAME="gns-waitlist-signup"
ROLE_NAME="gns-lambda-role"
API_NAME="gns-waitlist-api"

echo "✅ Starting GNS AWS setup in $REGION..."

# -------------------------------------------------------------
# STEP 1 — DynamoDB table
# -------------------------------------------------------------
echo ""
echo "🗄️  Creating DynamoDB table: $TABLE_NAME"

aws dynamodb create-table \
  --table-name "$TABLE_NAME" \
  --attribute-definitions \
      AttributeName=email,AttributeType=S \
      AttributeName=signedUpAt,AttributeType=S \
  --key-schema \
      AttributeName=email,KeyType=HASH \
      AttributeName=signedUpAt,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region "$REGION"

echo "✅ DynamoDB table created."

# -------------------------------------------------------------
# STEP 2 — IAM role for Lambda
# -------------------------------------------------------------
echo ""
echo "🔐 Creating IAM role: $ROLE_NAME"

aws iam create-role \
  --role-name "$ROLE_NAME" \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": { "Service": "lambda.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }]
  }'

# Attach AWS-managed policies
aws iam attach-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess

aws iam attach-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

echo "✅ IAM role created and policies attached."
echo "⏳ Waiting 10 seconds for IAM role to propagate..."
sleep 10

# -------------------------------------------------------------
# STEP 3 — Package and deploy Lambda
# -------------------------------------------------------------
echo ""
echo "📦 Packaging Lambda function..."

cd lambda
zip -j ../lambda_deploy.zip lambda_function.py
cd ..

echo "🚀 Creating Lambda function: $FUNCTION_NAME"

# Get your AWS account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

aws lambda create-function \
  --function-name "$FUNCTION_NAME" \
  --runtime python3.12 \
  --role "arn:aws:iam::${ACCOUNT_ID}:role/${ROLE_NAME}" \
  --handler lambda_function.lambda_handler \
  --zip-file fileb://lambda_deploy.zip \
  --environment "Variables={TABLE_NAME=$TABLE_NAME}" \
  --region "$REGION"

echo "✅ Lambda function deployed."

# -------------------------------------------------------------
# STEP 4 — HTTP API Gateway
# -------------------------------------------------------------
echo ""
echo "🌐 Creating HTTP API Gateway: $API_NAME"

API_ID=$(aws apigatewayv2 create-api \
  --name "$API_NAME" \
  --protocol-type HTTP \
  --cors-configuration \
      AllowOrigins="https://growthnetworksystem.com,https://www.growthnetworksystem.com" \
      AllowMethods=POST,OPTIONS \
      AllowHeaders=Content-Type \
  --region "$REGION" \
  --query ApiId \
  --output text)

echo "✅ API created. API ID: $API_ID"

# Create Lambda integration
INTEGRATION_ID=$(aws apigatewayv2 create-integration \
  --api-id "$API_ID" \
  --integration-type AWS_PROXY \
  --integration-uri "arn:aws:lambda:${REGION}:${ACCOUNT_ID}:function:${FUNCTION_NAME}" \
  --payload-format-version 2.0 \
  --region "$REGION" \
  --query IntegrationId \
  --output text)

echo "✅ Integration created. Integration ID: $INTEGRATION_ID"

# Create POST /waitlist route
aws apigatewayv2 create-route \
  --api-id "$API_ID" \
  --route-key "POST /waitlist" \
  --target "integrations/$INTEGRATION_ID" \
  --region "$REGION"

echo "✅ Route POST /waitlist created."

# Deploy to prod stage
aws apigatewayv2 create-stage \
  --api-id "$API_ID" \
  --stage-name prod \
  --auto-deploy \
  --region "$REGION"

echo "✅ Stage 'prod' deployed."

# Allow API Gateway to invoke the Lambda
aws lambda add-permission \
  --function-name "$FUNCTION_NAME" \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:${REGION}:${ACCOUNT_ID}:${API_ID}/*/*/waitlist" \
  --region "$REGION"

echo "✅ Lambda invoke permission granted."

# -------------------------------------------------------------
# DONE — Print your endpoint URL
# -------------------------------------------------------------
echo ""
echo "============================================================"
echo "🎉 ALL DONE! Your API endpoint is:"
echo ""
echo "  https://${API_ID}.execute-api.${REGION}.amazonaws.com/prod/waitlist"
echo ""
echo "👉 Now open index.html and replace YOUR_API_ID with: $API_ID"
echo "============================================================"

# Clean up zip
rm -f lambda_deploy.zip
