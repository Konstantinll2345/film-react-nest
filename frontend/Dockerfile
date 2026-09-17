# ---------- сборка ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- отдает ----------
FROM alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

CMD ["sh", "-c", "cp -r /app/dist/* /output/ && tail -f /dev/null"]