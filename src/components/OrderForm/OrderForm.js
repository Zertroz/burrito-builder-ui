import React, { useState } from 'react';
import { postOrders } from '../../apiCalls';

function OrderForm({renderOrders}) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name && ingredients.length === 0) {
      setError('Please fill out your order.')
    } else if (ingredients.length === 0) {
      setError('Please select ingredients.');
    } else if (!name) {
      setError('Please input a name.');
    } else {
      const newOrder = {
        id: Date.now(),
        name: name,
        ingredients: ingredients
      };
      await postOrders(newOrder);
      clearInputs();
      renderOrders();
    }
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
      {error && <p className='error'>{error}</p>}
      <p>Order: { ingredients.join(', ') || 'Nothing selected' }</p>

      <button name='submit' onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}

export default OrderForm;
