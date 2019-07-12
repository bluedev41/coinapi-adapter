# Chainlink CoinApi External Adapter

Obtain an API key from [CoinAPI.io](https://www.coinapi.io/pricing).

## Input Params

- `coin`: The coin to query (required)
- `market`: The currency to convert to (required)

## Output Format

```json
{
	"time": "2019-07-12T17:54:00.0033625Z",
	"asset_id_base": "ETH",
	"asset_id_quote": "USD",
	"rate": 274.164982165807
}
```

## Install

```bash
npm install
```

## Test

```bash
npm test
```

## Create the zip

```bash
zip -r cl-coinapi.zip .
```

## Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `cl-coinapi.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpservice
- Click More, Add variable
  - NAME: API_KEY
  - VALUE: Your_API_key

## Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 8.10 for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `cl-coinapi.zip` file
- Handler should remain index.handler
- Add the environment variable:
  - Key: API_KEY
  - Value: Your_API_key
- Save
