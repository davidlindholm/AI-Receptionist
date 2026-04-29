#!/bin/bash
# =============================================================
#  GNS — API Gateway setup (run this after aws_setup.sh)
#  Picks up from Step 4 — everything before this is already done
# =============================================================

set -e
REGION="us-west-2"
FUNCTION_NAME="gns-waitlist-signup"
API_NAME="gns-waitlist-api"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "🌐 Creating HTTP API Gateway: $API_NAME"

API_ID=$(aws apigatewayv2 create-api \
  --name "$API_NAME" \
  --protocol-type HTTP \
  --cors-configuration '{
    "AllowOrigins": ["https://growthnetworksystem.com","https://www.growthnetworksystem.com"],
    "AllowMethods": ["POST","OPTIONS"],
    "AllowHeaders": ["Content-Type"]
  }' \
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

echo "✅ Integration created. ID: $INTEGRATION_ID"

# Create POST /waitlist route
aws apigatewayv2 create-route \
  --api-id "$API_ID" \
  --route-key "POST /waitlist" \
  --target "integrations/$INTEGRATION_ID" \
  --region "$REGION"

echo "✅ Route POST /waitlist created."

# Deploy prod stage
aws apigatewayv2 create-stage \
  --api-id "$API_ID" \
  --stage-name prod \
  --auto-deploy \
  --region "$REGION"

echo "✅ Stage 'prod' deployed."

# Allow API Gateway to invoke Lambda
aws lambda add-permission \
  --function-name "$FUNCTION_NAME" \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:${REGION}:${ACCOUNT_ID}:${API_ID}/*/*/waitlist" \
  --region "$REGION"

echo "✅ Lambda invoke permission granted."

echo ""
echo "============================================================"
echo "🎉 ALL DONE! Your API endpoint is:"
echo ""
echo "  https://${API_ID}.execute-api.${REGION}.amazonaws.com/prod/waitlist"
echo ""
echo "👉 Open index.html and replace YOUR_API_ID with: $API_ID"
echo "============================================================"
