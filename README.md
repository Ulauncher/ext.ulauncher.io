# Development

1. Create .env.local file in /src directory with next options:
```
REACT_APP_AUTH0_CLIENT_ID=<id>
REACT_APP_AUTH0_DOMAIN=<yourdomain>.auth0.com
REACT_APP_API_BASE_URL=<api.endpoint>
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