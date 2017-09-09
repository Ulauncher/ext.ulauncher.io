# Installation

1. Create .env file in /src directory with next options:
```
AUTH0_CLIENT_ID=<id>
AUTH0_DOMAIN=<yourdomain>.auth0.com
API_ENDPOINT=<api.endpoint>
``` 

2. How to run development server
```
npm run-script dev
```

3. How to build app
```
NODE_ENV=production npm run-script webpack
```