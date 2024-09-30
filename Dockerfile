# build =================
FROM node:18 AS builder

ARG VITE_PUBLIC_API_URL
ARG VITE_PUBLIC_FIREBASE_CONFIG

RUN test -n "$VITE_PUBLIC_API_URL"
ENV VITE_PUBLIC_API_URL ${VITE_PUBLIC_API_URL}

RUN test -n "$VITE_PUBLIC_FIREBASE_CONFIG"
ENV VITE_PUBLIC_FIREBASE_CONFIG ${VITE_PUBLIC_FIREBASE_CONFIG}

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY ./ ./
RUN npm run build

# run =================
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production

COPY --from=builder /app/build /app/build
CMD ["node", "build"]
