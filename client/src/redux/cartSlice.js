import { createSlice } from '@reduxjs/toolkit';

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    address: {},
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      if (existingItem) {
        // If the item already exists, update its quantity
        existingItem.quantity++;
      } else {
        // If the item is not already in the cart, add it
        state.items.push({ ...newItem, quantity: 1 });
      }
      // Recalculate total price
      state.totalPrice = calculateTotalPrice(state.items);
    },
    incrementQuantity: (state, action) => {
      const { _id } = action.payload; // Assuming `_id` is the unique identifier
      const item = state.items.find(item => item._id === _id);
      if (item) {
        item.quantity++;
        state.totalPrice += parseFloat(item.price);
      }
    },
    decrementQuantity: (state, action) => {
      const { _id } = action.payload; // Assuming `_id` is the unique identifier
      const item = state.items.find(item => item._id === _id);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalPrice -= parseFloat(item.price);
      }
    },
    removeFromCart: (state, action) => {
      const { _id } = action.payload; // Assuming `_id` is the unique identifier
      const removedItem = state.items.find(item => item._id === _id);
      if (removedItem) {
        state.items = state.items.filter(item => item._id !== _id);
        state.totalPrice -= parseFloat(removedItem.price) * removedItem.quantity;
      }
    },
    setAddresss: (state, action) => { 
      state.address = action.payload;
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart,setAddresss } = cartSlice.actions;
export default cartSlice.reducer;
