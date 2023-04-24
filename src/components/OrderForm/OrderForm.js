import React, { useState } from 'react';
import { postOrders } from '../../apiCalls';

function OrderForm({renderOrders}) {
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState([])

  const handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      name: name,
      ingredients: ingredients
    };
    postOrders(newOrder);
    clearInputs();
    renderOrders();
  }

  const clearInputs = () => {
    setName('')
    setIngredients([])
  }

  const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
  const ingredientButtons = possibleIngredients.map(ingredient => {
    return (
      <button key={ingredient} name={ingredient} value={ingredient} onClick={e => {
        e.preventDefault()
        setIngredients([...ingredients, e.target.value])
        }}>
        {ingredient}
      </button>
    )
  });

  return (
    <form>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={e => setName(e.target.value)}
      />

      { ingredientButtons }

      <p>Order: { ingredients.join(', ') || 'Nothing selected' }</p>

      <button onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}

export default OrderForm;
