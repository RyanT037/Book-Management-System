# Validation Refactor Report

## Changes Made

- Replaced Zod schemas with React Hook Form built-in validation rules.
- Moved validation messages directly beside each form field registration.
- Simplified the validation architecture so the form code is easier to read and explain.

## Removed Dependencies

- zod
- @hookform/resolvers

## Removed Files

- frontend/src/schemas/auth.schema.ts
- frontend/src/schemas/

## Updated Forms

- Login form
- Register form
- Add Book form
- Edit Book form

## Benefits of Simplification

- Validation is easier to read because each rule is next to its input.
- The code is more beginner-friendly for a student project.
- There are fewer files and concepts to explain during assessment.
- Maintenance is simpler because React Hook Form now handles form state and validation together.

## Functionality Verification

- Login validation still checks required email, valid email format, and password length.
- Register validation still checks required fields, minimum lengths, email format, and matching passwords.
- Add Book and Edit Book validation still check required book fields and a valid published year.
- Forms still submit the same payload shapes to the backend services.
