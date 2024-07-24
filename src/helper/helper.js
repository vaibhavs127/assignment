export const calculatePoints = (amount) => {
  if (typeof amount !== "number") {
    throw new Error("Invalid Amount")
  }

  if (amount < 0) {
    return 0;
  }
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2;
    amount = 100
  }

  if (amount > 50) {
    points += (amount - 50) * 1
  }

  return points
}

export const groupCustomerById = (array) => {

  if (!Array.isArray(array)) {
    throw new Error("Invalid Array")
  }
  const grouped = {};

  for (const transaction of array) {

    const { customerName, customerId } = transaction;

    if (!grouped[customerId]) {
      grouped[customerId] = {
        customerName,
        customerId,
        transactions: []
      }
    }
    grouped[customerId].transactions.push(transaction)
  }

  return Object.values(grouped)
}

export const monthNames = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
]