# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Accept build arguments for environment variables
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_TWILIO_ACCOUNT_SID
ARG VITE_TWILIO_AUTH_TOKEN
ARG VITE_TWILIO_CONTENT_SID
ARG VITE_WEBSITE_WHATSAPP_NUMBER
ARG GEMINI_API_KEY

# Explicitly set ENV from ARG so they are available during 'npm run build'
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_TWILIO_ACCOUNT_SID=$VITE_TWILIO_ACCOUNT_SID
ENV VITE_TWILIO_AUTH_TOKEN=$VITE_TWILIO_AUTH_TOKEN
ENV VITE_TWILIO_CONTENT_SID=$VITE_TWILIO_CONTENT_SID
ENV VITE_WEBSITE_WHATSAPP_NUMBER=$VITE_WEBSITE_WHATSAPP_NUMBER
ENV GEMINI_API_KEY=$GEMINI_API_KEY

RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Create a robust configuration for React Router (SPA)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]