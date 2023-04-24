import React, { Component, useState, useEffect } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

function App() {
  const [orders, setOrders] = useState([]);
  
  const renderOrders = async () => {
    console.log(orders)
    const response = await getOrders()
    console.log(orders)
    setOrders(response.orders)
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

      <Orders orders={orders}/>
    </main>
  );
}


export default App;
