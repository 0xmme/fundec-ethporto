# pull official base image
FROM python:3.10.8-slim-buster

# set working directory
RUN mkdir -p /src
WORKDIR /src

# install system dependencies
RUN apt-get update \
  && apt-get -y install netcat gcc \
  && apt-get clean

# install python dependencies
RUN pip install --upgrade pip
COPY ./requirements/dev.txt .
RUN pip install -r dev.txt

# add app
COPY . .

# add entrypoint.sh
COPY ./entrypoint.sh .
RUN chmod +x /src/entrypoint.sh

# run entrypoint.sh
ENTRYPOINT ["/src/entrypoint.sh"]
