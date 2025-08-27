FROM node:20-bullseye-slim

RUN apt-get update && apt-get install -y \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/euloge-devs/REL-MD.git /rel_bot

WORKDIR /rel_bot

RUN npm install

EXPOSE 8000

CMD ["npm", "run", "start"]
