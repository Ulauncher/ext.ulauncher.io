# Development

1. Create .env.local file in /src directory with next options:
```
AUTH0_CLIENT_ID=<id>
AUTH0_DOMAIN=<yourdomain>.auth0.com
API_ENDPOINT=<api.endpoint>
``` 

2. Install dependencies
```
yarn install
```

## Run dev server
```
yarn start
```

## Build website
```
NODE_ENV=production yarn build
```