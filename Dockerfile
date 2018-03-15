FROM node
RUN yarn
WORKDIR /app
ADD . /app
CMD yarn dev
