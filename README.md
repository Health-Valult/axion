# 🏥 Axion - Medical Data Management System

**Axion** is a secure and scalable platform for managing patient medical records, observations, encounters, medications, and doctor-patient communication. It is designed for clinical environments, research, and government healthcare systems, with support for both web and mobile clients.

> **Note:** This project is proprietary and not open-source.

---

## 🚀 Features

- 🧬 **FHIR-Based Architecture**: Data modeled after the FHIR standard, stored in a custom BSON/JSON format
- 🧩 **Modular Microservices**: Includes dedicated services for security, records, analytics, and notifications
- 🔐 **Session & Token Management**: Supports OTP, mTLS, and secure login flows
- 🔄 **GraphQL Support**: Unified API layer enabling efficient and flexible client-server communication
- 📡 **Real-Time WebSocket Support**: Provides live updates and notifications for dynamic client experiences
- 🔍 **Elasticsearch Integration**: Enables fast, flexible autocomplete and powerful search functionality
- 🗂️ **Custom Encounter-Based Model**: Organizes all medical data under encounter records for clarity and traceability
- 📍 **Built-in Location Security**: Detects suspicious login activity based on location and time anomalies
- ⚡ **FastAPI Backend**: Deployed with Azure and MongoDB (Cosmos DB) for high performance and scalability
- 🧾 **Flexible Output Formats**: Generates tailored data views for both doctors and patients
- 📱 **Available Mobile App**: A full-featured mobile application for both patients and healthcare providers

---

## 🧱 Architecture Overview

```
Clients (Web / Mobile)
        |
   API Gateway (Azure)
        |
+-----------------------------+
|     Microservice Layer     |
|-----------------------------|
| - Security Service         |
| - Record Management        |
| - Notification Service     |
| - Analytics/Admin Service  |
+-----------------------------+
        |
Database Layer (MongoDB / DocumentDB / EFS)
```

---

## 🛠️ Tech Stack

- 🐍 **Backend**: Python (FastAPI), Rust (experimental)
- 🔄 **API**: GraphQL
- 🧠 **Cache**: Redis Stack (required)
- 🗃️ **Database**: MongoDB / Azure Cosmos DB (Mongo API)
- 🔎 **Search**: Elasticsearch (via Snowstorm)
- 🛡️ **Security**: OTP, mTLS, Authenticator App Integration
- ☁️ **Deployment**: Azure, Docker, Cloudflare

---

## 🧪 Getting Started (Dev)

### Prerequisites

- 🐍 Python 3.10+
- 🐳 Docker
- 🗃️ MongoDB / Cosmos DB setup
- 🧠 Redis Stack

### Run Services Locally

```bash
git clone https://github.com/your-org/medical-data-management.git
cd medical-data-management

# Start all services using Docker Compose (if defined)
docker-compose up --build
```

---

## 📦 API Highlights

### Records Service

- 📤 `POST /records/encounter`
- 📥 `GET /records/observations/{patient_id}`

### Security Service

- 📝 `POST /auth/signup`
- 🔑 `POST /auth/otp-verify`

### Notifications

- 📣 `POST /notify/push`
- ⚡ WebSocket Events for real-time alerts

---

## 📈 Future Enhancements

- 🏥 HL7 / FHIR compliance tooling
- 🌐 GraphQL federation support
- 🤖 AI-driven health alerts

---

## 👥 Contributors

- 👨‍💻 [Your Name] – Tech Lead
- 💼 [Team Member] – Business & Strategy
- 👩‍💻 [Other Members]

---

## 📄 License

This project is **not open-source**.

---

For partnerships or integration inquiries, please contact: `contact@yourcompany.com`

