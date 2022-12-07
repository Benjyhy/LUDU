FROM node:16.17
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002
RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . ./
ENTRYPOINT ["npm", "run"]
CMD ["web"]