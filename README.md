# Thikana

Thikana is a full-stack web application built with Node.js, Express.js, MongoDB, and EJS. It follows a modular architecture for authentication, database management, validation, image storage, and map integration.

## Tech Stack

| Category       | Technology  |
| -------------- | ----------- |
| Runtime        | Node.js     |
| Backend        | Express.js  |
| Database       | MongoDB     |
| ODM            | Mongoose    |
| View Engine    | EJS         |
| Authentication | Passport.js |
| Session Store  | MongoDB     |
| Image Storage  | Cloudinary  |
| File Uploads   | Multer      |
| Validation     | Joi         |
| Maps           | Mapbox      |

## Prerequisites

Before running the project locally, ensure you have the following installed or configured:

* Node.js
* MongoDB or MongoDB Atlas
* Cloudinary account
* Mapbox access token

## Installation

```bash
git clone https://github.com/Arshad-Ali-067/thikana.git
cd thikana
npm install
```

## Environment Configuration

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_access_token
```

Keep all credentials private and never commit the `.env` file to version control.

## Running Locally

Start the application with:

```bash
node app.js
```

The application will be available at:

```text
http://localhost:8080
```

## Project Structure

```text
thikana/
├── controllers/       # Application logic
├── init/              # Initialization and seed data
├── models/            # Mongoose data models
├── public/            # Static assets
├── routes/            # Application routes
├── utlis/             # Utility modules
├── views/             # EJS templates
│
├── app.js             # Application entry point
├── cloudConfig.js     # Cloudinary configuration
├── middleware.js      # Custom middleware
├── schema.js          # Validation schemas
├── package.json       # Project configuration
└── README.md          # Project documentation
```

## Architecture

The application follows a modular server-side architecture:

```text
Client
  │
  ▼
Express Routes
  │
  ▼
Controllers
  │
  ├── Models ──────────► MongoDB
  │
  ├── Middleware
  │
  ├── Validation
  │
  └── Cloudinary
  │
  ▼
EJS Views
  │
  ▼
Client
```

Authentication and session management are handled using Passport.js, Express Session, and MongoDB-backed session storage.

## External Services

**MongoDB** is used as the primary database, with Mongoose providing schema definitions and database interaction.

**Cloudinary** is used for image storage and management. Multer handles file uploads before they are transferred to Cloudinary.

**Mapbox** provides map and location-related functionality within the application.

## Deployment

The application is deployed on Render.

**Live Application:**
https://thikana-4gia.onrender.com/

## License

This project is licensed under the ISC License.

## Author

**Arshad Ali**

GitHub: https://github.com/Arshad-Ali-067
