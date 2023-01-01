# Echomart - An eCommerce API server

# Used Techs:

- Nodejs (v16.x)
- Expressjs
- PostgreSQL
- TypeScript
- `TypeORM`
- Docker, Docker-compose (initially for postgres & redis)
- Redis & Redis-Client (for `tokens` store)
- Bcrpyt, JSONWebToken (`JWT`), Cookies & Cookie Parser, etc.
- `RBAC` model for authentication & authorization
- TDD: Test Driven Development with `JEST`
- API Documentation in markdown and `swagger-express` too.


# Installation & Setup guide

**# Download or Clone this repository first**

```bash
$ git clone https://github.com/0xMahabub/echomart-api.git
```

**# Install dependencies**

```bash
$ yarn install
```

**# Configure your environment variables**

```bash
PORT=4000 # change it as you need
NODE_ENV=development # change this if need

# For TypeORM
DB_TYPE=postgres
DB_HOST=127.0.0.1
DB_PORT=5500
DB_USER=postgres
DB_PASS=postgres123
DB_NAME=eapidb


# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6400

# SECRETS
JWT_SECRET=secret
JWT_EXPIRE=43200000 # 12hr in ms
SESSION_SECRET=secret
SESSION_EXPIRE=43200000 # 12hr in ms
COOKIE_CRED=ilovecookie
```
<!-- 
**# Run Seeders (Set some inital data in database first)**

```bash
$ yarn seed
``` -->

**# Build & Run your application**

```bash
$ yarn build
# and then,
$ yarn start
```

---

