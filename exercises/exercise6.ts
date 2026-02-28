import { logError } from "./logger.js";

//============================================================================
// EXERCISE 6: Temporal Logic Error - Operating Hours
//
// ANTI-PATTERN: Representing domain-specific time concepts as raw numbers.
// Two problems: (1) invalid values (25, -5) are accepted, and (2) the
// business logic for "is the restaurant open?" is wrong for overnight spans.
//
// DDD FIX: Encapsulate the concept of "operating hours" in a Value Object
// that owns its own validation AND its own logic.
//
// HINT - Value Object with behavior:
//   type Hour = number & { readonly __brand: unique symbol }
//   function createHour(h: number): Hour {
//       if (!Number.isInteger(h) || h < 0 || h > 23)
//           throw new Error("Hour must be 0-23")
//       return h as Hour
//   }
//
//   class OperatingHours {
//       private constructor(
//           public readonly opens: Hour,
//           public readonly closes: Hour,
//       ) {}
//
//       static create(opens: number, closes: number): OperatingHours {
//           return new OperatingHours(createHour(opens), createHour(closes))
//       }
//
//       isOpenAt(hour: Hour): boolean {
//           // Handles midnight crossover correctly
//           if (this.opens <= this.closes) {
//               return hour >= this.opens && hour < this.closes
//           }
//           return hour >= this.opens || hour < this.closes
//       }
//   }
//
// KEY INSIGHT: In DDD, domain logic lives inside the domain objects, not in
// external utility functions. OperatingHours knows how to answer "am I open?"
// because that question is part of its domain responsibility.
// ============================================================================

type Hour = number & { readonly __brand: unique symbol };

function createHour(h: number): Hour {
  if (!Number.isInteger(h) || h < 0 || h > 23) {
    throw new Error("Hour must be an integer between 0 and 23");
  }
  return h as Hour;
}

class OperatingHours {
  private constructor(
    public readonly opens: Hour,
    public readonly closes: Hour,
  ) {}

  static create(opens: number, closes: number): OperatingHours {
    return new OperatingHours(createHour(opens), createHour(closes));
  }

  isOpenAt(hour: Hour): boolean {
    if (this.opens <= this.closes) {
      return hour >= this.opens && hour < this.closes;
    }

    return hour >= this.opens || hour < this.closes;
  }
}

class Restaurant {
  constructor(
    public readonly name: string,
    public readonly hours: OperatingHours,
  ) {}

  isOpenAt(hour: number): boolean {
    return this.hours.isOpenAt(createHour(hour));
  }
}

export function exercise6_TemporalLogic() {
  const restaurant = new Restaurant(
    "Joe's Diner",
    OperatingHours.create(22, 6),
  );

  const testHour = 2; // 2 AM

  const isOpenCorrect = restaurant.isOpenAt(testHour);

  console.log("Is open at 2 AM:", isOpenCorrect);

  // TODO: Replace the raw numbers with an OperatingHours Value Object.
  // Move the isOpen logic INSIDE the Value Object so it correctly handles
  // overnight spans and rejects invalid hours at construction time.

  try {
    OperatingHours.create(25, -5);
  } catch (error) {
    logError(6, "Invalid hours rejected at construction time", { error });
  }

  try {
    restaurant.isOpenAt(30);
  } catch (error) {
    logError(6, "Invalid query hour rejected", { error });
  }
}
