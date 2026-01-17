#  Foodie App – Full Stack Food Delivery Application

A full-stack food delivery web application built using **React, Node.js, Express.js, MongoDB**, and **Stripe**, featuring secure authentication, dynamic cart management, online payments, and an admin dashboard for order and menu management.

---



## 📌 Features

### 👤 User Features
- User authentication with **JWT (Sign Up / Login)**
- Secure password hashing using **bcrypt**
- Browse **15+ food categories** and **50+ menu items**
- Add, remove, and update food items in cart
- Real-time cart synchronization
- Secure online payments using **Stripe**
- Order placement and **order status tracking**

### 🛠 Admin Features
- Admin panel for food & order management
- Add, update, and delete food items (CRUD operations)
- View and manage user orders
- Improved order processing workflow

---

## 🧰 Tech Stack

### Frontend
- React
- React Router
- Context API / Redux
- Axios
- HTML5, CSS3, JavaScript

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt
- Stripe API
- CORS-enabled REST APIs

### Deployment
- Frontend: **Netlify**
- Backend: **Vercel (Serverless Functions)**
- Database: **MongoDB Atlas**

---




---

## 🔐 Authentication & Security

- JWT-based authentication for users and admins
- Password hashing using **bcrypt**
- HTTP-only cookies for secure token storage
- CORS configured for secure cross-origin communication

---

## 💳 Payment Integration

- Integrated **Stripe Payment Gateway**
- Secure and reliable online payment processing
- 99.9% transaction success rate during testing

---

## ⚙️ Environment Variables

Create a `.env` file in the **server** directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
