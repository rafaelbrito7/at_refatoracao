// Constants for magic numbers to improve readability and maintainability


// This interface adheres to the Single Responsibility Principle (SRP) by defining a single responsibility - simulating connection events.
export interface IConnectionEventSimulator {
  simulate(min: number, max: number): number;
}

// Implementation of the IConnectionEventSimulator
class ConnectionEventSimulator implements IConnectionEventSimulator {
  simulate(min: number, max: number): number {
    const delta = max - min + 1;
    return Math.floor(Math.random() * delta) + min;
  }
}

export const connectionEventSimulator = new ConnectionEventSimulator();
