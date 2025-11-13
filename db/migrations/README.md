# Database Migrations

This directory contains SQL migrations that must be run after schema changes.

## Running Migrations

### 1. Push Drizzle Schema Changes
```bash
npm run db:push
```

### 2. Run SQL Migrations (in order)
```bash
psql $DATABASE_URL -f db/migrations/001_pic_distribution_aggregate_constraint.sql
```

## Migration Files

### 001_pic_distribution_aggregate_constraint.sql
**Purpose**: Enforces database-level constraint that ensures all distribution recipients for a given rule sum to exactly 10,000 basis points (100%).

**Why it's needed**: 
- Prevents fund misallocation in the PIC (Planet Impact Credits) distribution system
- Guarantees the 60/25/15 split (or any configured split) is always accurate
- Protects against concurrent modifications
- Cannot be expressed in Drizzle schema alone (requires PostgreSQL trigger)

**What it does**:
- Creates a trigger function `validate_pic_distribution_total()`
- Attaches BEFORE INSERT/UPDATE/DELETE trigger to `pic_distribution_recipients`
- Uses row-level locking (FOR UPDATE) to prevent race conditions
- Raises an exception if total basis points != 10,000

**When to run**: After creating the `pic_distribution_recipients` table via `npm run db:push`

## Migration Workflow

1. Make schema changes in `shared/schema.ts`
2. Run `npm run db:push` to sync tables/columns
3. Run SQL migrations from this directory in numerical order
4. Verify constraints: `psql $DATABASE_URL -c "\d+ pic_distribution_recipients"`
