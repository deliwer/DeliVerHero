-- =============================================================================
-- PIC Distribution Recipients Aggregate Constraint
-- =============================================================================
-- Ensures that for each distribution rule, the sum of all recipient basis_points
-- equals exactly 10,000 (representing 100%) to maintain the integrity of the
-- 60/25/15 distribution split or any other configured allocation.
--
-- This trigger runs BEFORE INSERT, UPDATE, or DELETE on pic_distribution_recipients
-- and validates that the total basis points for the affected rule equals 10,000.
--
-- Run this migration AFTER running: npm run db:push
-- =============================================================================

-- Create the validation function (DEFERRABLE CONSTRAINT TRIGGER)
CREATE OR REPLACE FUNCTION validate_pic_distribution_total()
RETURNS TRIGGER AS $$
DECLARE
    v_rule_id VARCHAR;
    v_total_basis_points INTEGER;
    v_lock INTEGER;
BEGIN
    -- Determine which rule to check
    IF (TG_OP = 'DELETE') THEN
        v_rule_id := OLD.rule_id;
    ELSE
        v_rule_id := NEW.rule_id;
    END IF;

    -- Lock the parent distribution rule to serialize concurrent writers
    -- This prevents race conditions when multiple transactions modify the same rule
    SELECT 1 INTO v_lock
    FROM pic_distribution_rules
    WHERE id = v_rule_id
    FOR UPDATE;

    -- Calculate total basis points for this rule
    -- This query sees all changes made in the current transaction
    SELECT COALESCE(SUM(basis_points), 0) INTO v_total_basis_points
    FROM pic_distribution_recipients
    WHERE rule_id = v_rule_id;

    -- Validate that total equals 10,000 basis points (100%)
    -- This check happens at COMMIT time (deferred), so all INSERTs can complete first
    IF v_total_basis_points != 10000 THEN
        RAISE EXCEPTION 'Distribution rule % must have exactly 10,000 basis points total (currently %). Each rule must sum to 100%%.', 
            v_rule_id, v_total_basis_points
            USING HINT = 'Add or adjust recipients within the same transaction so the total equals 10,000 basis points (100%)';
    END IF;

    RETURN NULL; -- Return value ignored for AFTER trigger
END;
$$ LANGUAGE plpgsql;

-- Create the constraint trigger (DEFERRABLE INITIALLY DEFERRED)
-- This validates at COMMIT time, allowing multi-row inserts within a transaction
DROP TRIGGER IF EXISTS enforce_pic_distribution_total ON pic_distribution_recipients;

CREATE CONSTRAINT TRIGGER enforce_pic_distribution_total
    AFTER INSERT OR UPDATE OR DELETE
    ON pic_distribution_recipients
    DEFERRABLE INITIALLY DEFERRED
    FOR EACH ROW
    EXECUTE FUNCTION validate_pic_distribution_total();

-- Add helpful comment
COMMENT ON TRIGGER enforce_pic_distribution_total ON pic_distribution_recipients IS 
    'Ensures all distribution recipients for a rule sum to exactly 10,000 basis points (100%)';

COMMENT ON FUNCTION validate_pic_distribution_total() IS
    'Validation function that enforces the 10,000 basis points total per distribution rule. Uses FOR UPDATE lock to prevent concurrent modification issues.';
