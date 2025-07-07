# 📝 BuzzWrite – Full Stack Blogging Platform

**BuzzWrite** is a full-featured blogging platform built with **Spring Boot**, **React**, **Tailwind CSS**, and **JWT-based Spring Security**. It supports user authentication, post creation/editing, profile customization, and responsive UI — designed to deliver a smooth writing and reading experience.

---

## 🚀 Features

- 🔐 **JWT Authentication** with Spring Security
- ✍️ Create, edit, and delete blog posts
- 🧑‍💼 Profile customization with image upload (Cloudinary)
- 💾 Save/unsave posts
- 🌙 Dark mode toggle
- 🔎 Search and filter by category/tags
- 📱 Fully responsive layout (Tailwind CSS)

---

## 🧰 Tech Stack

| Layer       | Technology                             |
|------------|-----------------------------------------|
| **Backend**| Java, Spring Boot, Spring MVC, JPA, MySQL, Spring Security (JWT) |
| **Frontend**| React.js, Tailwind CSS                  |
| **Auth**    | JWT Token-based authentication          |
| **Database**| MySQL                                   |
| **Media**   | Cloudinary (for image uploads)          |
| **Tools**   | Postman, GitHub, Maven, VS Code, Eclipse |

---

## 🗂️ Folder Structure

BuzzWrite/
├── backend/
│ ├── src/main/java/com/buzzwrite/...
│ └── application.properties
├── frontend/
│ ├── src/components/
│ ├── src/pages/
│ └── App.js

## 📦 How to Run Locally

### 🔧 Backend (Spring Boot)

```bash
cd backend
# Configure MySQL credentials in application.properties
./mvnw spring-boot:run
