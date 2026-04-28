# 📡 Content Broadcasting System – Backend Project Documentation

## 🧾 Project Overview

The **Content Broadcasting System** is a backend application designed for modern educational environments where teachers distribute digital content (such as study materials, announcements, and question papers) directly to students.

This system ensures that all content uploaded by teachers is **reviewed and approved by the Principal** before being made publicly accessible. It also implements a **time-based scheduling and rotation mechanism**, allowing content to be broadcast dynamically based on subject and timing.

---

## 🚀 Tech Stack

### ⚙️ Backend

* **Node.js** – Runtime environment
* **Express.js** – REST API framework

### 🗄️ Database

* **MySQL** – Relational database
* **Sequelize ORM** – Database modeling & querying

### 🔐 Authentication

* **JWT (JSON Web Token)** – Secure authentication
* **bcrypt** – Password hashing

### ☁️ File Storage

* **AWS S3** – Cloud storage for uploaded files
* **Local storage** – local storage for uploaded files (downloads)

---

## 🏗️ System Architecture

The system is divided into modular components:

* 🔐 Auth Module
* 👤 User Module (Teacher / Principal)
* 📚 Content Module
* 📤 Upload Module
* ✅ Approval Module
* 🔄 Scheduling Module

---

## 🔄 Content Lifecycle

```txt
uploaded → pending → approved / rejected
```

* Only **approved content** is available for broadcasting
* Rejected content includes a **rejection reason**

---

## 📡 API Endpoints (Sample)

### 🔐 Auth

```http
POST api/auth/register
POST api/auth/login
```

### 📚 Content

```http
POST api/content/upload
GET api/content/my
```

### ✅ Approval (role: principal)

```http
GET api/approval/
get api/approval/pending
PATCH api/approval/:id/approve
PATCH api/approval/:id/reject
```

### 🌐 Public

```http
GET api/public/live/:teacherId

```

---

## 📁 Project Structure

```txt
src/
 ├── controllers/
 ├── routes/
 ├── services/
 ├── models/
 ├── middlewares/
 ├── utils/
 ├── config/
 └── app.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <repo-link>
cd project-folder
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create `.env`

```env
PORT=5000

DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=

JWT_SECRET=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=
```

### 4️⃣ Run Project

```bash
npm run dev
```

---

## 🔐 Security Features

* JWT-based authentication
* Role-based access control (RBAC)
* Secure password hashing
* Protected API routes
* File validation (JPG, PNG, GIF only)

---

## ⚠️ Edge Case Handling

* No content available → returns empty response
* Approved but outside schedule → not shown
* Invalid subject → empty response
* File size & format validation

---

## 🚧 Challenges Faced

* Handling timezone differences (UTC vs IST)
* Implementing dynamic scheduling logic
* AWS S3 integration and permissions
* Database relationship constraints (Sequelize)
* Handling async errors and edge cases

---

## 🏁 Conclusion

This project demonstrates:

* Real-world backend system design
* Clean modular architecture
* Complex scheduling & rotation logic
* Secure API development
* Cloud integration (AWS S3)

---

## 👨‍💻 Author

**Varun Sharma**
Backend Developer Assignment

---
