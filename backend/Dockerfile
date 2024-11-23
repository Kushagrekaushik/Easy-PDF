# Use Node.js as the base image
FROM node:18-slim

# Install dependencies required for Puppeteer and Google Chrome
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libxshmfence1 \
    libgbm1 \
    wget \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Google Chrome
RUN wget -q -O google-chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get update && apt-get install -y ./google-chrome.deb && \
    rm google-chrome.deb && \
    apt-get -f install && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set Puppeteer to work with the system-installed Chrome
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

# Create and set the working directory
WORKDIR /usr/src/app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application files
COPY . .

# Create the directories for uploads and converted files
RUN mkdir -p uploads files

# Expose the port your app will run on
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
