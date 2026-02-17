# E-Channeling RESTful API

Production-ready RESTful CRUD API for appointment management in an E-Channeling system using **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and **MVC architecture**.

## 1) Folder Structure

```bash
Echanelling/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── appointmentController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   ├── models/
│   │   └── appointmentModel.js
│   ├── routes/
│   │   └── appointmentRoutes.js
│   └── utils/
│       └── apiError.js
├── .env.example
├── package.json
└── README.md
```

## 2) Setup & Run

### Install dependencies
```bash
npm install
```

### Configure environment
```bash
cp .env.example .env
```

Update `.env` values if needed:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/echanneling
NODE_ENV=development
```

### Start API
```bash
npm run dev
```

---

## 3) API Endpoint List

Base URL: `http://localhost:5000/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/appointments` | Book appointment |
| GET | `/appointments` | View all appointments |
| PATCH | `/appointments/:id` | Update appointment |
| DELETE | `/appointments/:id` | Cancel appointment |
| GET | `/health` | Health check |

---

## 4) Sample JSON Request & Response

### A) Book appointment
**POST** `/api/v1/appointments`

#### Request
```json
{
  "patientName": "John Silva",
  "patientEmail": "john.silva@example.com",
  "doctorName": "Dr. Nimal Perera",
  "specialization": "Cardiology",
  "appointmentDate": "2026-12-20T10:30:00.000Z",
  "notes": "Follow-up consultation"
}
```

#### Response (201)
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "data": {
    "_id": "66c88abf73944e5ec8e8d1fa",
    "patientName": "John Silva",
    "patientEmail": "john.silva@example.com",
    "doctorName": "Dr. Nimal Perera",
    "specialization": "Cardiology",
    "appointmentDate": "2026-12-20T10:30:00.000Z",
    "status": "BOOKED",
    "notes": "Follow-up consultation",
    "createdAt": "2026-08-23T08:40:15.126Z",
    "updatedAt": "2026-08-23T08:40:15.126Z"
  }
}
```

### B) View all appointments
**GET** `/api/v1/appointments`

#### Response (200)
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "66c88abf73944e5ec8e8d1fa",
      "patientName": "John Silva",
      "patientEmail": "john.silva@example.com",
      "doctorName": "Dr. Nimal Perera",
      "specialization": "Cardiology",
      "appointmentDate": "2026-12-20T10:30:00.000Z",
      "status": "BOOKED",
      "notes": "Follow-up consultation",
      "createdAt": "2026-08-23T08:40:15.126Z",
      "updatedAt": "2026-08-23T08:40:15.126Z"
    }
  ]
}
```

### C) Update appointment
**PATCH** `/api/v1/appointments/:id`

#### Request
```json
{
  "appointmentDate": "2026-12-21T12:00:00.000Z",
  "notes": "Rescheduled due to travel"
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "Appointment updated successfully",
  "data": {
    "_id": "66c88abf73944e5ec8e8d1fa",
    "appointmentDate": "2026-12-21T12:00:00.000Z",
    "notes": "Rescheduled due to travel",
    "updatedAt": "2026-08-23T09:10:30.002Z"
  }
}
```

### D) Cancel appointment
**DELETE** `/api/v1/appointments/:id`

#### Response (200)
```json
{
  "success": true,
  "message": "Appointment cancelled successfully",
  "data": {
    "_id": "66c88abf73944e5ec8e8d1fa",
    "status": "CANCELLED",
    "updatedAt": "2026-08-23T09:20:30.002Z"
  }
}
```

---

## 5) Basic API Documentation

### Architecture
- **MVC pattern**:
  - **Model**: Mongoose schema for appointments with timestamps.
  - **Controller**: Business logic with async/await and try-catch.
  - **Routes**: Endpoint mapping and request validation.
  - **Middleware**: Input validation + centralized error handler.

### Validation
- Uses `express-validator` for request body and route parameter validation.
- Returns `400 Bad Request` with detailed field-level validation errors.

### Error Handling
- Centralized error middleware handles operational and unexpected errors.
- Returns consistent JSON error payloads.

### Status Codes
- `201 Created` - successful creation.
- `200 OK` - successful read/update/cancel.
- `400 Bad Request` - validation/invalid ID errors.
- `404 Not Found` - route/resource not found.
- `500 Internal Server Error` - unhandled server errors.

### Appointment Status Flow
- Newly booked appointment defaults to `BOOKED`.
- Can be updated to `COMPLETED` or `CANCELLED`.
- Cancel action (`DELETE`) performs a soft cancellation by changing status to `CANCELLED`.

