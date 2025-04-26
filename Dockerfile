FROM node:8 as builder

WORKDIR /var/app

ENV REACT_APP_AUTH0_CLIENT_ID %REACT_APP_AUTH0_CLIENT_ID%
ENV REACT_APP_AUTH0_DOMAIN %REACT_APP_AUTH0_DOMAIN%
ENV REACT_APP_API_BASE_URL %REACT_APP_API_BASE_URL%

COPY package.json yarn.lock ./
RUN yarn

COPY . .

RUN yarn build

FROM nginx:1.14-alpine

WORKDIR /var/app

COPY --from=builder /var/app/build .
COPY entrypoint.sh .
ENTRYPOINT [ "/var/app/entrypoint.sh" ]

COPY nginx-config/webapp.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx" ]
