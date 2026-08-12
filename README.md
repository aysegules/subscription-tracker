<div>

<h3 align="center">Subscription Tracker Project</h3>
<div align="center">
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" alt="node.js" />
    <img src="https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express.js" />
    <img src="https://img.shields.io/badge/-Postgresql-424ef5?style=for-the-badge&logo=postgresql&logoColor=white" alt="postgresql" />
    <img src="https://img.shields.io/badge/-Prisma-13aa52?style=for-the-badge&logo=prisma&logoColor=white" alt="prisma" />
  </div>
 </div>

## Introduction

This repository demonstrates a subscription tracker project.The project was built using NodeJS, Express, PostgreSQL, Prisma ORM, Arcjet and Upstash. It is a RestfulAPI project that provides functions like creating a subscription, getting a subscription by a user ID, and many more..

---

## Tech Stack

- **Node.js** – JavaScript runtime for server-side development

- **Express.js** – Fast, minimalist web framework for Node.js

- **JWT (JSON Web Tokens)** – Secure authentication and authorization

- **Prisma** – Next-generation ORM for database management

- **PostgreSQL** – Powerful, open-source relational database

- **Arcjet** - Runtime security platform

- **Upstash** - Fully managed serverless database platform

- **Zod** – TypeScript-first schema validation library

- **Bcryptjs** – Password hashing for secure user authentication

- **Dotenv** – Environment variable management

---

## Features

**Advanced Rate Limiting and Bot Protection**: With Arcjet that helps you secure the whole app.

**Database Management** : Secure and easy database management with Prisma ORM.

**JWT Authentication**: User CRUD operations and subscription management.

**Global Error Handling**: Input validation and middleware integration.

**Logging Mechanisms**: For better debugging and monitoring.

**Email Reminders**: Automating smart email reminders with workflows using Upstash.

and many more, including code architecture and reusability.

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)

- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)

- [Git](https://git-scm.com/)

**Cloning the Repository**

```bash
git clone https://github.com/aysegules/subscription-tracker.git
cd subscription-tracker
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
#PORT
PORT = 5500

VERSION = "/api/v1"
SERVER_URL = "http://localhost:5500"

NODE_ENV = "development/production"

#DATABASE URL
DATABASE_URL="postgresql://username:password@localhost:5432/DB_name?schema=public"

#JWT AUTH
JWT_SECRET="secret"
JWT_EXPIRES_IN="1d"

#ARCJET
ARCJET_KEY = "ajkey"
ARCJET_ENV="development"

#UPSTASH
QSTASH_URL="q-url"
QSTASH_TOKEN="q-token"
QSTASH_CURRENT_SIGNING_KEY="q-kwy"
QSTASH_NEXT_SIGNING_KEY="q-sign-key"
QSTASH_DEV=true

#NODEMAILER
GOOGLE_ACCOUNT="account"
EMAIL_PASSWORD="app password"
```

For the JWT secret variable you can run following command in terminal in your VS Code editor:

```bash
openssl rand -base64 32
```

This command will give you a secret key that generated randomly.

**Set Up The Database**

```bash
npx prisma migrate dev --name init

npx prisma generate

npm run seed:subscriptions
```

**Start the Development Server**

```bash
npm run dev
```

Open http://localhost:5500/api/v1 in your browser or any HTTP client to test your project.

## Links

- **Prisma** - https://www.prisma.io/
- **Arcjet** - https://arcjet.com/
- **Upstash** - https://upstash.com/
