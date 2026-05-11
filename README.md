# School Management System API

Node.js + Express API for managing schools with MySQL. Supports adding schools and listing them sorted by proximity to a given location.

## Tech Stack
- Node.js + Express
- MySQL (Aiven)

## Setup

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment
Create `.env` in project root:
```
PORT=3000
DB_HOST=your_host
DB_PORT=your_port
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

### 3) Create database table
Run this in your MySQL client:
```sql
CREATE TABLE schools (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	address VARCHAR(500) NOT NULL,
	latitude DECIMAL(10, 7) NOT NULL,
	longitude DECIMAL(10, 7) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_schools_lat_lng ON schools (latitude, longitude);
```

### 4) Start the server
```bash
npm run dev
```

Health check:
```
GET http://localhost:3000/health
```

## API Endpoints

### POST /addSchool
Adds a school to the database.

**Request body**
```json
{
	"name": "ABC Public School",
	"address": "Sector 10, Noida",
	"latitude": 28.6,
	"longitude": 77.3
}
```

**Response**
```json
{
	"success": true,
	"message": "School added",
	"data": {
		"id": 1,
		"name": "ABC Public School",
		"address": "Sector 10, Noida",
		"latitude": 28.6,
		"longitude": 77.3
	},
	"error": null
}
```

### GET /listSchools
Returns schools sorted by distance from the given location.

**Query params**
```
latitude=28.6&longitude=77.3
```

**Response**
```json
{
	"success": true,
	"message": "Schools sorted by proximity",
	"data": [
		{
			"id": 1,
			"name": "ABC Public School",
			"address": "Sector 10, Noida",
			"latitude": 28.6,
			"longitude": 77.3,
			"distance_km": 0
		}
	],
	"error": null
}
```

## Postman Collection
Import the collection from:
`postman/School-Management-System.postman_collection.json`

## Deployment (Render + Aiven)
1) Push the repo to GitHub.
2) Create a Render Web Service from the repo.
3) Set env vars in Render (same as `.env`).
4) Build: `npm install`
5) Start: `npm start`
6) Verify health endpoint.
