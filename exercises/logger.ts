import * as fs from "fs"

// Log file for silent errors
const LOG_FILE = "silent_errors.log"

// Initialize log file
fs.writeFileSync(LOG_FILE, "=== SILENT ERRORS LOG ===\n\n")

export function logError(exerciseNum: number, message: string, data: unknown): void {
	const timestamp = new Date().toISOString()
	const entry = `[Exercise ${exerciseNum}] ${timestamp}\n${message}\nData: ${JSON.stringify(data, null, 2)}\n---\n`
	fs.appendFileSync(LOG_FILE, entry)
}
