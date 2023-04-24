export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => {
        if(!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .catch(error => error)
}

export const postOrders = async (newOrder) => {
    const response = await fetch('http://localhost:3001/api/v1/orders', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newOrder)
    })
    if (!response.ok) {
      throw new Error(response.status)
    }
    const data = await response.json()
    return data
}