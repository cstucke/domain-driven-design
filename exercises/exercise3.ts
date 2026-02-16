import { logError } from "./logger.js"

//============================================================================
// EXERCISE 3: String Confusion - Email vs Phone vs Name
//
// ANTI-PATTERN: Every field is `string`. TypeScript treats all strings as
// interchangeable, so you can put an email in the name field and a name in
// the email field with zero complaints. Empty strings also pass silently.
//
// DDD FIX: Use distinct Branded Types for each domain concept.
// Each type gets its own smart constructor with format-specific validation.
//
// HINT:
//   type Email = string & { readonly __brand: unique symbol }
//   type Phone = string & { readonly __brand: unique symbol }
//   type CustomerName = string & { readonly __brand: unique symbol }
//
//   function createEmail(s: string): Email {
//       if (!/^[^@]+@[^@]+\.[^@]+$/.test(s)) throw new Error("Invalid email")
//       return s as Email
//   }
//   function createPhone(s: string): Phone {
//       if (!/^\d[\d\-]{6,}$/.test(s)) throw new Error("Invalid phone")
//       return s as Phone
//   }
//   function createCustomerName(s: string): CustomerName {
//       if (s.trim().length === 0) throw new Error("Name cannot be empty")
//       return s.trim() as CustomerName
//   }
//
// Now `Customer` becomes:
//   type Customer = { name: CustomerName; email: Email; phone: Phone }
//
// Swapping fields is a COMPILE-TIME error: Email is not assignable to Phone.
// This is the core DDD idea: make illegal states unrepresentable.
// ============================================================================

export function exercise3_StringConfusion() {
	type Customer = {
		name: string
		email: string
		phone: string
	}

	// TypeScript sees all strings as the same!
	const customer: Customer = {
		name: "john@example.com", // Silent bug! Email in name field
		email: "John Doe", // Silent bug! Name in email field
		phone: "555-PIZZA", // Silent bug! Letters in phone field
	}

	// TODO: Create separate branded types (Email, Phone, CustomerName) so
	// that swapping values between fields becomes a compile-time error.

	logError(3, "Fields mixed up - all are strings, TypeScript doesn't care", {
		customer,
		issue: "Email, phone, and name are all 'string' - no semantic distinction!",
	})

	// Even worse - empty strings pass validation
	const emptyCustomer: Customer = {
		name: "",
		email: "",
		phone: "",
	}

	logError(3, "Empty strings accepted everywhere", {
		customer: emptyCustomer,
		issue: "Required fields should not be empty!",
	})
}
