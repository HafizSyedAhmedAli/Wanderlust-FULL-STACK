# Wanderlust - Airbnb Clone

Wanderlust is a full-stack web application inspired by Airbnb, built with Node.js, Express, MongoDB, and Passport.js. Users can sign up, log in, create, edit, and delete property listings, upload images, leave reviews, and view listings on interactive maps. The app features authentication, server-side validation, flash messages, session management, and responsive design.

## Features

- **User Authentication:** Sign up, log in, and log out securely using Passport.js.
- **Property Listings:** Create, edit, and delete listings with image uploads (Cloudinary).
- **Reviews:** Leave, view, and delete reviews for listings.
- **Interactive Maps:** View listing locations using Leaflet and OpenStreetMap.
- **Filtering & Search:** Filter listings by category and search by title.
- **Responsive UI:** Built with Bootstrap and EJS templating.
- **Flash Messages:** Real-time feedback for user actions.
- **Session Management:** Secure sessions stored in MongoDB.
- **Server-side Validation:** Joi validation for listings and reviews.
- **Error Handling:** Custom error pages for a better user experience.

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- Passport.js (Authentication)
- Cloudinary (Image Uploads)
- Multer (File Uploads)
- Bootstrap 5
- EJS (Templating)
- Leaflet & OpenStreetMap (Maps)
- Joi (Validation)
- connect-flash, express-session

## Getting Started

1. **Clone the repository:**
   ```
   git clone https://github.com/HafizSyedAhmedAli/Wanderlust-FULL-STACK
   cd Wanderlust-FULL-STACK
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your MongoDB Atlas URL, Cloudinary credentials, and session secret:
     ```
     ATLASDB_URL=your_mongodb_url
     CLOUD_NAME=your_cloudinary_cloud_name
     CLOUD_API_KEY=your_cloudinary_api_key
     CLOUD_API_SECRET=your_cloudinary_api_secret
     SECRET=your_session_secret
     ```

4. **Run the app:**
   ```
   node app.js
   ```
   The app will be available at `http://localhost:8080`.

## Folder Structure

- `app.js` - Main application file
- `models/` - Mongoose models (User, Listing, Review)
- `controllers/` - Route handlers
- `routes/` - Express routers
- `middleware.js` - Custom middleware
- `public/` - Static assets (CSS, JS)
- `views/` - EJS templates
- `utils/` - Utility functions
- `init/` - Sample data and DB seeding

## License

This project is licensed under the ISC License.

---

**Wanderlust** is ideal for learning modern web development, authentication, CRUD operations, and interactive UI features. Feel free to fork, modify, and use as a base for your
