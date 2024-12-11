# MyPlaylists

Welcome to **MyPlaylists**, a feature-rich music platform that allows users to create, manage, and enjoy their favorite music playlists with seamless performance and advanced features like offline listening and PWA integration.

---

## Features

### 🎵 Music Playback

- Stream and manage your songs and playlists effortlessly.
- Advanced player controls for a smooth listening experience.

### 📥 Offline Listening

- Download songs and playlists to enjoy offline.
- Perfect for users with limited or no internet connectivity.

### 🚀 Progressive Web App (PWA)

- Install the app directly on your device for an app-like experience.
- Offers fast load times, reduced data usage, and full offline capabilities.

### 🔍 Smart Search

- Quickly find songs, artists, or playlists with our optimized search feature.

### 📂 Playlist Management

- Create, edit, and share custom playlists.
- Follow playlists created by others.

### 🛠️ Optimized Performance

- Smooth transitions and efficient handling of large playlists.
- Enhanced caching and minimized resource usage.

---

## Installation

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/myplaylists.git
   cd myplaylists
   ```

2. Install dependencies:

   ```bash
   composer install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   - Update the `.env` file with your database credentials and other necessary configurations.

4. Generate the application key:

   ```bash
   php artisan key:generate
   ```

5. Run migrations:

   ```bash
   php artisan migrate
   ```

6. Start the server:

   ```bash
   php artisan serve
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

---

## Deployment

1. Ensure your server meets the requirements for Laravel and Node.js.

2. Configure your server to host the backend (`/var/www/ps_music_core`) and frontend.

3. Set up environment variables for production in `.env`.

4. Use the following commands for production:

   - **Backend**:
     ```bash
     php artisan config:cache
     php artisan route:cache
     php artisan optimize
     ```
   - **Frontend**:
     ```bash
     npm run build
     ```

5. Deploy using Git-based workflows or preferred deployment tools.

---

## Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Contact

For support or feedback, reach out via pouriasabaghi\@gmail.com

