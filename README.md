# Book Store Website

## Description
This is an **Ecommerce project** for managing and selling books online. The project consists of a backend API built with **NestJS** and a frontend developed using **React**

## Features
- [x] User authentication (sign in, sign up, password reset)
- [x] Browse and search for books
- [x] Add books to cart and checkout
- [x] Admin panel for managing books, users, and orders
- [x] Payment gateway integration (PayOs)
- [x] Review and rating system for books

## Getting Started

### Prerequisites
Before you begin, make sure you have the following installed:
- Node.js (>= 14.x)
- npm (Node Package Manager)

### How to Run This Project

#### 1. Running the Backend (API server)
1. Navigate to the `Backend` folder:
   ```bash
   cd Backend
2. Install the necessary dependencies:
   ```bash
   npm install
3. Create a .env file in the root of the Backend directory and configure your environment variables (JWT secret).
4. Run the backend server in development mode:
   ```bash
   npm run start:dev
The backend should now be running at `http://localhost:3000`.
#### 2. Running the Frontend (Client)
1. Navigate to the `Frontend` folder:
   ```bash
   cd Frontend
2. Install the necessary dependencies:
   ```bash
   npm install
3. Create a .env file in the root of the Frontend directory and configure your environment variables (VITE_BACKEND_API=http://localhost:3000).
4. Start the frontend development server:
   ```bash
   npm run dev
The frontend should now be running at `http://localhost:5173` (or another port depending on your setup).
### Usage
Once both the frontend and backend are running, you can:
- Sign up and log in to your account
- Add books to your cart and complete the purchase
- Admin can log in to the admin panel to manage users, books, and orders
### Technologies Used
- __Backend:__ NestJS, TypeORM, MySQL, JWT.
- __Frontend:__ Vite,React, Redux, Axios, AntD, TailwindCss, SCSS/SASS, react-router-dom.
- __Other:__ PayOs,Vercel( for Frontend deploy), Koyeb( for Backend deploy), Aiven( for hosting database).
