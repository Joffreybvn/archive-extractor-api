FROM brunneis/python:3.9.0-ubuntu-focal

# Install the security updates
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y rar unrar

# Remove all cached file. Get a smaller image
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*

# Copy the application
COPY . /opt/app
WORKDIR /opt/app

# Upgrade pip
RUN pip install --upgrade pip setuptools wheel

# Install python libraries
RUN pip install -r requirements.txt

# Start the app
ENTRYPOINT [ "uvicorn" ]
CMD [ "extractor:app", "--reload" ]