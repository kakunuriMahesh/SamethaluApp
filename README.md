# 🌿 Telugu Samethalu App

A full-stack Telugu Proverbs (సామెతలు) application.

## Project Structure

```
TeluguSamethalu/
├── backend/     Node.js + Express + MongoDB API
├── admin/       React + Vite admin panel (web)
└── mobile/      React Native + Expo mobile app
```

## ⚡ Quick Start

### 1. Start MongoDB
Make sure MongoDB is running locally on port 27017.

### 2. Backend
```bash
cd backend
npm install
npm run seed       # seed 15 sample samethalu
npm run dev        # starts on http://localhost:5000
```

### 3. Admin Panel
```bash
cd admin
npm install
npm run dev        # opens at http://localhost:5173
```
Login password: `samethalu_admin_2026`

### 4. Mobile App
```bash
cd mobile
npx expo start
```
Scan the QR code with Expo Go app on your phone.

> **On physical device**: Edit `mobile/src/services/api.js` and change `BASE_URL` to your machine's LAN IP (e.g. `http://192.168.1.100:5000`)

## 🔌 API Reference

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/samethalu` | All samethalu (paginated) |
| GET | `/api/samethalu/:id` | Single sametha |
| GET | `/api/samethalu/search?q=` | Search |
| GET | `/api/samethalu/category/:cat` | By category |
| GET | `/api/samethalu/random` | Random sametha |
| GET | `/api/samethalu/day` | Sametha of the day |
| GET | `/api/samethalu/categories` | Category list with counts |

### Admin (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/login` | Get JWT token |
| GET | `/admin/stats` | Dashboard stats |
| GET | `/admin/sametha/list` | List all |
| POST | `/admin/sametha` | Add sametha |
| PUT | `/admin/sametha/:id` | Update sametha |
| DELETE | `/admin/sametha/:id` | Delete sametha |

## 📱 Mobile App Screens
- **Home** — Sametha of the Day + recent list
- **Search** — Search across Telugu text, meaning, category
- **Categories** — Browse by category grid
- **Category Detail** — Paginated list per category
- **Sametha Detail** — Full view with Telugu/English toggle

## 🖥️ Admin Panel Pages
- **Login** — Single password JWT auth
- **Dashboard** — Stats + category breakdown + quick actions
- **All Samethalu** — Search, filter, paginate, edit, delete
- **Add Sametha** — Full form with all fields
- **Edit Sametha** — Pre-populated edit form

## ⚙️ Environment Variables

### backend/.env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/telugu_samethalu
ADMIN_PASSWORD=samethalu_admin_2026
JWT_SECRET=samethalu_jwt_super_secret_2026
```

## 🔮 Future Features
- Push notifications for daily sametha
- Voice reading (Text-to-Speech)
- Sametha quiz
- Favorites / bookmarks
