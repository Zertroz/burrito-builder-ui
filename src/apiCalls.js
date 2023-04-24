export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const postOrders = async (newOrder) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/orders', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newOrder)
    })
    const data = await response.json()
    return data
  } catch(error) {
    return error
  }
}