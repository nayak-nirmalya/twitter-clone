# TWITTER Clone with React, Tailwind, Next, Prisma, Mongo, NextAuth, TypeScript & Vercel

This is a repository for a FullStack Twitter Clone using React, NextJS, TailwindCSS & Prisma.

Funcionalities:

- Authentication system
- Notification system
- Image Upload using Base64 strings
- Prisma ORM with MongoDB
- Responsive Layout
- 1 To Many Relations (User - Post)
- Many To Many Relations (Post - Comment)
- Following functionality
- Comments / Replies
- Likes functionality
- Vercel Deployment

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/nayak-nirmalya/twitter-clone.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
DATABASE_URL=
NEXTAUTH_JWT_SECRET=
NEXTAUTH_SECRET=
```

### Start the app

```shell
npm run dev
```

## Available commands

Run Prisma Studio

```shell
npx prisma studio
```

Running Commands with NPM `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
| `build` | Build instance of the app                |
| `start` | Run Build instance of the app            |
