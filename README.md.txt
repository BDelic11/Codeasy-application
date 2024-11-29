# Codeasy
This repository contains a Tourist Guide Application developed for a coding challenge as part of a job application at Codeasy. The app uses points of interest (Points) and routes (Routes) on a map, with REST API endpoints to fetch the nearest Routes and Points within a viewport, leveraging GeoJSON for data processing.

# **Tourist Guide Application**

This repository contains a **Tourist Guide Application**, developed as part of a coding challenge for a job application at Codeasy. The application helps users explore points of interest (Points) and routes (Routes) on a map, with the backend implemented in **NestJS** and the frontend in **Next.js**.

---

## **Features**

### **Points of Interest (Points)**
- Each point represents a specific location, defined as a polygon in **GeoJSON** format.
- Examples of points include parks, historical landmarks, and natural attractions.
- GeoJSON properties, except for geometry, are ignored as per task requirements.

### **Routes**
- A **Route** is a collection of Points that form a cohesive travel path or area of interest.
- Examples include walking tours, bike routes, or nature trails.
- Routes provide users with structured and engaging exploration options.

---

## **REST API Endpoints**

### **1. GET `/findNearestRoutes?lng=<lng>&lat=<lat>&count=<count>`**
- **Purpose:** Returns the nearest routes based on given geographical coordinates (`lng`, `lat`).
- **Parameters:**
  - `lng`: Longitude of the user's location.
  - `lat`: Latitude of the user's location.
  - `count` (optional): Number of routes to return (default: 10).
- **Use Case:** Show nearby routes when the app launches.

### **2. GET `/findPointsInViewport?lng1=<lng1>&lat1=<lat1>&lng2=<lng2>&lat2=<lat2>`**
- **Purpose:** Returns all points of interest within a defined rectangular area (bounding box).
- **Parameters:**
  - `lng1`, `lat1`: Longitude and latitude of the first corner.
  - `lng2`, `lat2`: Longitude and latitude of the opposite corner.
- **Use Case:** Display visible points on the map as the user moves or zooms.

---

## **Technical Stack**

### **Backend: NestJS**
- Handles API logic, including fetching and processing data from the external API (`https://chat.codeasy.com/api/job-application`).
- Implements GeoJSON operations such as filtering points within a bounding box and calculating distances.

### **Frontend: Next.js**
- Integrates with **Mapbox** for interactive map visualization.
- Communicates with the backend to fetch and display nearby routes and points in real time.

---

## **Setup Instructions**

### **Backend**
1. **Clone the Backend Repository:**
   ```bash
   git clone https://github.com/your-username/nest-backend.git
   cd nest-backend
