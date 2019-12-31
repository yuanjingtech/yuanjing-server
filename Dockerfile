FROM node
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build
ENTRYPOINT yarn start:prod
EXPOSE 4000
