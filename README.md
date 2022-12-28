# Echomart - An eCommerce API server

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
DB_PORT=5432 # database port
DB_HOST=localhost # database hostname/address
DB_NAME=your_db_name
DB_USER=db_user
DB_PASS=db_password
-------------------
REDIS_URL=redis # redis server connection
JWT_SECRET=secret # JWT sercet key
```

**# Run Seeders (Set some inital data in database first)**

```bash
$ yarn seed
```

**# Build & Run your application**

```bash
$ yarn build
# and then,
$ yarn start
```

---

# Used Techs:

- Nodejs (v16.x)
- Expressjs
- PostgreSQL
- TypeScript
- `TypeORM`
- Redis & Redis-Client (for `cookie` store)
- Bcrpyt, JSONWebToken (`JWT`), etc.
- `RBAC` model for authentication & authorization
- TDD: Test Driven Development with `JEST`
- API Documentation in markdown and `swagger-express` too.
