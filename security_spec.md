# Security Specification & Hardening Matrix

## 1. Data Invariants

- **Invitaciones (`/invitaciones/{invitacionId}`)**:
  1. `invitacionId` must be a valid alphanumeric/hyphen ID under 128 characters (`isValidId(invitacionId)`).
  2. Public unauthenticated writes are strictly forbidden. Writes require authenticated admin credentials or server administration.
  3. Invitations cannot contain oversized fields or arbitrary keys outside the schema.
  4. The `estado` property must strictly be one of `activo` or `revocado`.
  5. The `accesosTotales` counter must be a non-negative number.
  6. Email must be a string under 160 characters.

- **Admins (`/admins/{adminId}`)**:
  1. Root admin directory is locked against unauthorized modifications.
  2. Bootstrapped admin is `becerraarles83@gmail.com`.

## 2. The Dirty Dozen Payloads (Target: PERMISSION_DENIED)

1. **Unauthenticated Write**: An unauthenticated user attempts to write to `/invitaciones/inv_test_1`.
2. **Ghost Key Injection**: Payload with extra unauthorized field `hack: true` or `isAdmin: true`.
3. **Oversized String Injection (Denial of Wallet)**: `nombre` with a 2MB character string.
4. **Invalid State Injection**: `estado` set to `"superuser"` instead of `"activo"` or `"revocado"`.
5. **Path Traversal / Junk ID**: Writing to an illegal path variable like `../../root`.
6. **Negative Access Counter**: `accesosTotales` set to `-50`.
7. **Type Confusion on ID**: `id` passed as a boolean `true` instead of string.
8. **Spoofed Admin Role in Payload**: Non-admin attempting to register as superadmin.
9. **Blanket Listing by Anonymous**: Unauthenticated user attempting to list all invitations.
10. **Tampering with CreatedAt**: Replacing timestamp with a fake epoch date.
11. **Email Spoofing without Verification**: User with unverified token trying to access admin doc.
12. **Arbitrary Subcollection Creation**: Attempting to create unauthorized subcollections under `/invitaciones/inv_test/backdoor`.
