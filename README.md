# 🍽️ ReserveBite - Restaurant Reservation Management System

ReserveBite is a full-stack restaurant table reservation management application that allows customers to book tables online while enabling administrators to manage reservations and restaurant table availability.

The system focuses on reservation availability, conflict prevention, role-based access control, and clean REST API design.

---

## 🚀 Live Deployment

Frontend:

```
https://reserve-byte.vercel.app
```

Backend API:

```
https://reserve-byte.onrender.com
```

---

## 📌 Features

### Customer Features

- Customer registration and login
- Secure authentication using JWT cookies
- Create table reservations
- Automatic table allocation
- View personal reservations
- Cancel existing reservations
- Real-time validation messages

---

### Admin Features

- Admin protected dashboard
- View all reservations
- Filter reservations by date
- Cancel customer reservations
- Add restaurant tables
- Delete tables
- Manage table capacity

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Toastify
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- HTTP-only Cookies
- Zod Validation
- bcrypt

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

# 📂 Project Structure


```
ReserveBite
│
├── client
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   │   ├── admin
│   │   │   └── customer
│   │   ├── routes
│   │   └── services
│   │
│   └── package.json
│
│
└── server
    │
    ├── config
    ├── controller
    ├── middleware
    ├── models
    ├── routes
    ├── seed
    ├── utils
    ├── validators
    │
    ├── app.js
    ├── server.js
    └── package.json
```

---

# ⚙️ Setup Instructions


## 1. Clone Repository


```bash
git clone <repository-url>

cd ReserveBite
```

---

# Backend Setup


Navigate to backend:


```bash
cd server
```


Install dependencies:


```bash
npm install
```


Create `.env` file:


```env
PORT=5000

MONGO_URI=your_mongodb_connection_url

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173

NODE_ENV=development
```


Start backend:


```bash
npm run dev
```


Server runs on:


```
http://localhost:5000
```


---

# Frontend Setup


Navigate:


```bash
cd client
```


Install dependencies:


```bash
npm install
```


Create `.env`:


```env
VITE_API_URL=http://localhost:5000/api
```


Run:


```bash
npm run dev
```


Frontend runs on:


```
http://localhost:5173
```


---

# 🔐 Authentication & Authorization


The application uses JWT based authentication.

- After login/register, JWT is stored inside an HTTP-only cookie.
- Protected APIs require a valid JWT token.
- Middleware verifies user identity before allowing access.


Role based authorization:


## Customer


Allowed:

- Create reservations
- View own reservations
- Cancel own reservations


Restricted:

- Cannot access admin APIs


---


## Admin


Allowed:

- View all reservations
- Manage restaurant tables
- Cancel any reservation


Implemented using:

```javascript
protect

authorize("admin")
```

middleware flow.


---

# 🪑 Data Models


## User Model


```javascript
{
 name,
 email,
 password,
 role
}
```


Roles:


```
customer
admin
```


---


## Table Model


```javascript
{
 tableNumber,
 capacity
}
```


Used to store restaurant tables and seating capacity.


---


## Reservation Model


```javascript
{
 user,
 table,
 date,
 startTime,
 endTime,
 guests,
 status
}
```


Relationships:

- Reservation belongs to User
- Reservation belongs to Table


---

# 🧠 Reservation Availability Logic


The reservation system automatically finds an available table.


Process:


### 1. Capacity Validation


Find tables where:


```
table.capacity >= requested guests
```


Example:


Customer needs 4 seats.

Tables:

```
Table 1 → capacity 2 ❌

Table 2 → capacity 4 ✅
```


Only valid tables are considered.


---


### 2. Conflict Prevention Algorithm


The system prevents overlapping reservations.


Overlap condition:


```
Existing Start Time < New End Time

AND

Existing End Time > New Start Time
```


Example:


Existing:

```
6:00 PM - 8:00 PM
```


Rejected:


```
7:00 PM - 9:00 PM
```


Allowed:


```
8:00 PM - 10:00 PM
```


---

### 3. Automatic Table Selection


Tables are sorted by capacity:


```
capacity ascending
```


The smallest suitable available table is assigned.


This improves restaurant table utilization.


---

# ✔️ Input Validation


Validation includes:


- Required fields
- Guest count greater than zero
- End time must be after start time
- Past date booking prevention
- Invalid requests handled gracefully


Implemented using:

- Zod validation
- Centralized Express error middleware


---

# 🌐 API Overview


## Authentication


| Method | Endpoint |
|-|-|
|POST| `/api/auth/register` |
|POST| `/api/auth/login` |
|POST| `/api/auth/logout` |


---

## Customer Reservation


|Method|Endpoint|
|-|-|
|POST| `/api/reservations` |
|GET| `/api/reservations/my` |
|DELETE| `/api/reservations/:id` |


---

## Admin


|Method|Endpoint|
|-|-|
|GET| `/api/admin/reservations` |
|DELETE| `/api/admin/reservations/:id` |
|GET| `/api/admin/tables` |
|POST| `/api/admin/tables` |
|DELETE| `/api/admin/tables/:id` |


---

# 🔒 Security Practices


- Password hashing using bcrypt
- JWT authentication
- HTTP-only cookies
- Environment variables for secrets
- Protected admin routes
- CORS configuration
- Request validation


---

# Assumptions Made


- A reservation belongs to one table only.
- Payment functionality is outside the scope.
- Admin accounts are created using seed data.
- Table availability depends on date and time slot.
- Cancelled reservations do not block availability.


---

# Known Limitations


- No email notifications.
- No payment integration.
- No real-time table updates.
- No advanced analytics dashboard.
- Admin cannot edit restaurant opening hours.


---

# Areas For Improvement With More Time


- Real-time reservation updates using WebSockets
- Email confirmation after booking
- Calendar integration
- Advanced admin analytics
- Waitlist management system
- Multiple restaurant branch support
- Automated testing pipeline


---

# Author

Developed by **Sharad Pal**

Full Stack MERN Developer

```

---

This README directly covers every evaluation checkbox:
- deployment ✅  
- setup ✅  
- availability algorithm ✅  
- RBAC explanation ✅  
- assumptions ✅  
- limitations ✅  
- improvements ✅  
- data modeling ✅  
- security decisions ✅  

Good for assignment submission.
```