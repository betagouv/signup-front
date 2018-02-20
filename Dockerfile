FROM ubuntu
RUN apt-get update
RUN apt-get install -y wget
RUN wget -qO- https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g @angular/cli
WORKDIR /app
ADD . /app
CMD ng serve
