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
- Using R-Bush for optimized searching of points inside viewport (`https://github.com/mourner/rbush`)
- In memory caching in Nest.js for scalability

### **Frontend: Next.js**

- Integrates with **MapLibre** for interactive map visualization. (`https://visgl.github.io/react-map-gl/docs/get-started`)
- Communicates with the backend to fetch and display nearby routes and points in real time.

---

# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
