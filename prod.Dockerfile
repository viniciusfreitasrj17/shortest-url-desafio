#============= Builder ============#
FROM node:14-alpine3.10 as builder
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build
COPY ./ormconfig.js dist/

#============= Cleaner ============#
FROM node:14-alpine3.10 as cleaner
WORKDIR /usr/app
COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/dist ./
RUN npm install --production

#============= Runner ============#
FROM node:14-alpine3.10 as runner
WORKDIR /usr/app
COPY --from=cleaner /usr/app ./
CMD sh -c 'sleep 20; npm run start'
