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
- Routes provide users with structured and engaging exploration options.

---

## **REST API Endpoints**

### **1. GET `/routes/findNearestRoutes?lng=<lng>&lat=<lat>&count=<count>`**

- **Purpose:** Returns the nearest routes based on given geographical coordinates (`lng`, `lat`).
- **Parameters:**
  - `lng`: Longitude of the user's location.
  - `lat`: Latitude of the user's location.
  - `count` (optional): Number of routes to return (default: 10).
- **Use Case:** Show nearby routes of current user using his geolocation sent from frontend when the app launches.
- For this API route i used haversine distance and centroid calculation. I researched this formula is mostly used for these use cases. T
- **The Haversine formula** is used to calculate the shortest distance between two points on a sphere. I used this to find the distance between the user's location (latitude and longitude) and the "centroid" of each route.
- For each route, I calculated the **centroid**, which is like finding the "middle point" of all the coordinates in the route.
- This was done by averaging all the latitude and longitude values of the route's points.


- **How it works**
- The app first tries to get routes from the cache.
- If the cache is empty, it fetches routes from the API and stores them in the cache.
- It calculates the centroid of each route and then uses the Haversine formula to find distances from the user's location to the centroid.
- Finally, it sorts the routes by distance and returns the closest ones.



### **2. GET `/points/findPointsInViewport?lng1=<lng1>&lat1=<lat1>&lng2=<lng2>&lat2=<lat2>`**

- **Purpose:** Returns all points of interest within a defined rectangular area (bounding box).
- **Parameters:**
  - `lng1`, `lat1`: Longitude and latitude of the first corner.
  - `lng2`, `lat2`: Longitude and latitude of the opposite corner.
- **Use Case:** Display visible points on the map as the user zooms.
- on first load the it has initial bounding box set, but on every other user zoom in or zoom out it checks the bounding box of user map sw and ne coordinates and sets them as lat1, lng1...
- map on frontend is rerendered on zoom with new points that are inside viewport
- Using [ R-Bush ](https://github.com/mourner/rbush) for optimized searching of points inside viewport. RBush is a high-performance JavaScript library for 2D spatial indexing of points and rectangles. It's based on an optimized R-tree data structure with bulk insertion support. It is good for this use case because it optimizes searching within bounding box so i implemented it.

---

## **Technical Stack**

### **Backend: NestJS**

- Handles API logic, including fetching and processing data from the  [external API](https://chat.codeasy.com/api/job-application).
- Implements GeoJSON operations such as filtering points within a bounding box and calculating distances.
- I also used in memory cache in Nest.js for scalability of application and to avoid calling the API repeatedly if the data hasn't changed. On first time the data is fetched from external API and cached in memory. Every other time the data is used from cached and validated is there still data in cache. 
- Error handling is done by Class validators using a Validation pipe and it provides a convenient approach to enforce validation rules for all incoming client payloads, where the specific rules are declared with simple annotations in local class/DTO declarations in each module. Also Error handling is done by throwing exeptions like if the data from external API is handled in a right way.



### **Frontend: Next.js**

- Integrates with [**MapLibre**](https://visgl.github.io/react-map-gl/docs/get-started) for interactive map visualization. 
- Communicates with the backend to fetch and display nearby routes and points in real time.
- Using hooks like useEffect, useState with integration with react query and maplibre.

---

### How to use

- Clone the repository
- npm install inside "Codeasy"
- npm run dev

# Turborepo starter

- I used turborepo starter for this app

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `api`: a [Nest.js](https://nestjs.com/) app
- `client`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `api` and `client` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

- 
### Develop

To develop all apps and packages, run the following command:

```
cd Codeasy
npm run dev
```


## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
