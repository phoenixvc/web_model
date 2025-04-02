# Stage 1: Build
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy built application from the build stage
COPY --from=build /app ./

# Install .NET Aspire and .NET Arc
RUN apk add --no-cache \
    icu-libs \
    && wget https://dotnet.microsoft.com/download/dotnet/thank-you/runtime-aspire-5.0.0-linux-musl-x64-binaries \
    && tar -xzf runtime-aspire-5.0.0-linux-musl-x64-binaries -C /usr/share/dotnet \
    && wget https://dotnet.microsoft.com/download/dotnet/thank-you/runtime-arc-5.0.0-linux-musl-x64-binaries \
    && tar -xzf runtime-arc-5.0.0-linux-musl-x64-binaries -C /usr/share/dotnet

# Expose necessary ports
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
