# Financial Transactions API

A RESTful API for managing financial transactions with user authentication and authorization.

## Features

- **User Authentication**: Secure user identification between requests
- **Transaction Management**: Create, list, and retrieve specific transactions
- **Account Summary**: Get a complete overview of your account balance
- **Transaction Types**: Support for credit (additive) and debit (subtractive) transactions
- **Data Isolation**: Users can only access their own transactions

## API Endpoints

### Transactions
- `POST /transactions` - Create a new transaction
- `GET /transactions` - List all transactions for the authenticated user
- `GET /transactions/:id` - Get a specific transaction by ID (user must own the transaction)
- `GET /transactions/summary` - Get account summary with balance

### Authentication
- User identification is handled via cookies/session management
- Each request must include proper authentication credentials

## Transaction Types
- **Credit**: Increases the total balance (positive value)
- **Debit**: Decreases the total balance (negative value)

## Technical Requirements

- Node.js 24+
- PostgreSQL database
- TypeScript

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database configuration
```

3. Run database migrations:
```bash
npm run knex migrate:latest
```

## Development

Start the development server:
```bash
npm run dev
```

Run tests:
```bash
npm run test
```

Lint code:
```bash
npm run lint
```

Build for production:
```bash
npm run build
```

## Dependencies

### Runtime
- fastify: Web framework
- knex: SQL query builder
- pg: PostgreSQL client
- zod: Schema validation
- dotenv: Environment variables

### Development
- TypeScript: Type safety
- eslint: Code linting
- vitest: Testing framework
- tsup: TypeScript bundler

## Project Structure

```
src/
├── server.ts          # Application entry point
├── routes/            # API route handlers
├── middleware/        # Authentication middleware
├── database/          # Database configuration and migrations
└── utils/             # Utility functions and validations
```

## Usage Examples

Create a new transaction:
```bash
curl -X POST /transactions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Salary",
    "amount": 3000,
    "type": "credit"
  }'
```

Get all transactions:
```bash
curl -X GET /transactions
```

Get a specific transaction by ID:
```bash
curl -X GET /transactions/123abc
```

Get account summary:
```bash
curl -X GET /transactions/summary
```