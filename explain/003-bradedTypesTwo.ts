/*  USER REGISTRATION   */

type User = {
	name: any
	email: string
	phone: string
	password: string
}

const createUser = (
	name: any,
	email: string,
	phone: string,
	password: string,
): User => {
	return {
		name,
		email,
		phone,
		password,
	}
}
// CAREFUL ! This function is very flexible but also very error-prone. It accepts any strings !

/*  manual tests   */
const newUser = createUser(
	true,
	"alice@example.com",
	"secret123",
	"123-456-7890",
)

console.table(newUser)
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/********/

// TODO: 1. Type checks
// TODO: 2. Validation checks (Factory Functions) return Phone Type with a simple string (weak validation)
// TODO: 3. try-catch blocks around the calls to createPhone to handle potential validation errors gracefully, ensuring that the application can respond appropriately to invalid inputs without crashing.
// TODO: 4. Branded Types to prevent accidental misuse of the createUser function with raw strings, enhancing type safety in the restaurant domain.

/*

-----   Factory Functions  -----
const makeName()
const makeEmail()
const makePhone()
const makePassword()

*/

// Validation Rules for createUser:
// - name: Must be a non-empty string, typically 2-50 characters, no special characters except spaces/hyphens
// - email: Must follow valid email format (local@domain.tld), cannot be empty
// - phone: Already validated by createPhone factory (French format: 10 digits, valid prefix)
// - socialSecurityNumber: Must follow a specific format (depends on country - length, structure, checksum)
//   * Could be validated as a Value Object similar to Phone
//   * Should not be stored as plain string in production (PII/security concern)
// - All fields: Should check for null/undefined
// - Business rule: User must have unique email (typically checked against database)

// Branded Types:
// - Name: string & { readonly __brand: unique symbol }
// - Email: string & { readonly __brand: unique symbol }
// - Phone: string & { readonly __brand: unique symbol }
// - Password: string & { readonly __brand: unique symbol }
// - SocialSecurityNumber: string & { readonly __brand: unique symbol }