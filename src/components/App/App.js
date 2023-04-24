import React, { useState, useEffect } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

function App() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('')
  
  const renderOrders = async () => {
    const response = await getOrders()
    if (response instanceof Error) {
      setError(response)
    } else {
      setOrders(response.orders)
    }
  }

  useEffect(() => {
    renderOrders()
  }, [])

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm renderOrders={renderOrders}/>
      </header>
      {error && <p>{error.status}</p>}
      <Orders orders={orders}/>
    </main>
  );
}


export default App;
