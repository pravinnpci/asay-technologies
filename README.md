<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Asay Technologies

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/58c82734-ef82-4a2d-8288-3234647a97b7

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Run with Docker

If you have Docker installed, you can run the app without installing Node.js locally:

1. Build and start the container:
   `docker-compose up --build`
2. Access the app at: `http://localhost:3000`

## Deploy to Docker Hub

To push your local image to a web registry:
1. Run `push_image.bat`
2. Enter your Docker Hub credentials when prompted.
