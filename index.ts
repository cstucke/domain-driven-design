import * as readline from "readline"

import { exercise1_PrimitivePrice } from "./exercises/exercise1.js"
import { exercise2_PrimitiveQuantity } from "./exercises/exercise2.js"
import { exercise3_StringConfusion } from "./exercises/exercise3.js"
import { exercise4_BusinessRuleViolation } from "./exercises/exercise4.js"
import { exercise5_IdentityCrisis } from "./exercises/exercise5.js"
import { exercise6_TemporalLogic } from "./exercises/exercise6.js"
import { exercise7_CurrencyConfusion } from "./exercises/exercise7.js"
import { exercise8_EmailValidation } from "./exercises/exercise8.js"

//============================================================================
// MAIN CLI INTERFACE
// ============================================================================

async function runExercises() {
	console.log("🍽️  Domain-Driven Design: Restaurant Domain Exercises")
	console.log("=".repeat(60))
	console.log("\nThese exercises demonstrate SILENT ERRORS that TypeScript")
	console.log("doesn't catch when we use primitive types.\n")
	console.log(
		"After running, check 'silent_errors.log' to see what went wrong!\n",
	)

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	const question = (prompt: string): Promise<string> => {
		return new Promise((resolve) => {
			rl.question(prompt, resolve)
		})
	}

	// Let user trigger each exercise
	console.log("\n📋 Available Exercises:")
	console.log("1. Primitive Price Problem")
	console.log("2. Primitive Quantity Disaster")
	console.log("3. String Confusion (Email/Phone/Name)")
	console.log("4. Business Rule Violation (Table Capacity)")
	console.log("5. Identity Crisis (Order IDs)")
	console.log("6. Temporal Logic Error (Operating Hours)")
	console.log("7. Currency Confusion")
	console.log("8. Email Validation Gap")
	console.log("9. Run ALL exercises")
	console.log("0. Exit\n")

	let running = true

	while (running) {
		const choice = await question("Select an exercise (0-9): ")

		switch (choice.trim()) {
			case "1":
				exercise1_PrimitivePrice()
				console.log("✅ Exercise 1 completed. Check the log file!\n")
				break
			case "2":
				exercise2_PrimitiveQuantity()
				console.log("✅ Exercise 2 completed. Check the log file!\n")
				break
			case "3":
				exercise3_StringConfusion()
				console.log("✅ Exercise 3 completed. Check the log file!\n")
				break
			case "4":
				exercise4_BusinessRuleViolation()
				console.log("✅ Exercise 4 completed. Check the log file!\n")
				break
			case "5":
				exercise5_IdentityCrisis()
				console.log("✅ Exercise 5 completed. Check the log file!\n")
				break
			case "6":
				exercise6_TemporalLogic()
				console.log("✅ Exercise 6 completed. Check the log file!\n")
				break
			case "7":
				exercise7_CurrencyConfusion()
				console.log("✅ Exercise 7 completed. Check the log file!\n")
				break
			case "8":
				exercise8_EmailValidation()
				console.log("✅ Exercise 8 completed. Check the log file!\n")
				break
			case "9":
				console.log("\n🔄 Running all exercises...\n")
				exercise1_PrimitivePrice()
				exercise2_PrimitiveQuantity()
				exercise3_StringConfusion()
				exercise4_BusinessRuleViolation()
				exercise5_IdentityCrisis()
				exercise6_TemporalLogic()
				exercise7_CurrencyConfusion()
				exercise8_EmailValidation()
				console.log("✅ All exercises completed. Check the log file!\n")
				break
			case "0":
				running = false
				console.log("\n👋 Exiting. Review 'silent_errors.log' for findings!\n")
				break
			default:
				console.log("❌ Invalid choice. Try again.\n")
		}
	}

	rl.close()
}

// Run the interactive CLI
runExercises().catch(console.error)

export default runExercises
