# RSUI Website

RSUI Website rewrite. Made with laravel, inertiajs, react, mantine, and tailwindcss.

## Table of Contents

- [RSUI Website](#rsui-website)
  - [Table of Contents](#table-of-contents)
  - [Production](#production)
    - [SSR](#ssr)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
      - [Pnpm](#pnpm)
      - [Env](#env)
      - [Local Development](#local-development)
  - [Acknowledgements](#acknowledgements)

## Production

### Preparation

See [Gitlab CI](./.gitlab-ci.yml) for more information.

```sh
php artisan optimize
```

### SSR

For SSR to work properly. Don't use any `window` or `document` in your components. Use `useEffect` to access the `window` or `document` object.

Also to run the SSR properly you will need to follow this documentation: [SSR Documentation](https://inertiajs.com/server-side-rendering#running-the-ssr-server).

Basically once the server is ready, just run the following command to start the SSR server:

```sh
php artisan inertia:start-ssr
```

In a production environment, you can use a process manager like PM2 to keep the SSR server running:

```sh
pm2 start php --name "inertia-ssr" -- artisan inertia:start-ssr
pm2 save
```

## Installation

### Prerequisites

Before you begin, ensure you have met the following requirements:

- PHP 8.3
- Composer
- Node.js (20+) and pnpm
- A web server (e.g., Apache, Nginx)
- A database (e.g., MySQL, PostgreSQL)

### Steps

#### Pnpm

It is recommended to use pnpm to manage the front-end dependencies. You can install pnpm globally using npm:

```sh
npm install -g pnpm
```

#### Env

Make sure to make and fill the .env file. You can copy the .env.example file and rename it to .env.

```sh
cp .env.example .env
```

#### Local Development

**Install dependencies:**

```sh
composer install
pnpm install
```

**Generate an application key:**

```sh
php artisan key:generate
```

**Update the following lines in your .env file to match your database configuration:**

```sh
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

**Run the database migrations:**

```sh
php artisan migrate
```

**Seed the database:**

```sh
php artisan db:seed
```

**Build the front-end assets:**

```sh
pnpm run dev
```

**Start the development server:**

```sh
php artisan serve
```

Default Admin User:
Email: <admin@example.com>
Password: password
You can log in with these credentials and start managing your application.

## Acknowledgements

Laravel
Inertia.js
React
Tailwind CSS
