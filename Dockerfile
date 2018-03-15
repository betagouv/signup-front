FROM node
RUN npm install -g yarn
RUN yarn
WORKDIR /app
ADD . /app
CMD yarn dev
