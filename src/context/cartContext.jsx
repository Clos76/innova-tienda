import { createContext, useReducer, useContext, useEffect } from "react";

const initialState = {
  items: [],
};

function getInitialCart() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    try {
      const parsed = JSON.parse(storedCart);
      if (parsed && Array.isArray(parsed.items)) {
        return parsed;
      }
    } catch {
      // JSON inválido, ignorar
    }
  }
  return initialState;
}

function cartReducer(state, action) {
  // Remove the default parameter - this was causing issues
  const items = state.items || [];
  
  // console.log("Cart Reducer Action:", action.type, action.payload); // Debug log
  // console.log("Current State:", state); // Debug log
  
  switch (action.type) {
    case "ADD_ITEM":
      const existingIndex = items.findIndex(
        item => item.id === action.payload.id && item.talla === action.payload.talla
      );
      
      if (existingIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          cantidad: updatedItems[existingIndex].cantidad + action.payload.cantidad
        };
        
        const newState = { ...state, items: updatedItems };
        // console.log("Updated existing item, new state:", newState); // Debug log
        return newState;
      } else {
        // New item, add to cart
        const newState = { ...state, items: [...items, action.payload] };
        // console.log("Added new item, new state:", newState); // Debug log
        return newState;
      }

    case "REMOVE_ITEM":
      const filteredItems = items.filter(
        item => !(item.id === action.payload.id && item.talla === action.payload.talla)
      );
      return { ...state, items: filteredItems };

    case "UPDATE_QUANTITY":
      const updatedItems = items.map(item =>
        item.id === action.payload.id && item.talla === action.payload.talla
          ? { ...item, cantidad: action.payload.cantidad }
          : item
      );
      return { ...state, items: updatedItems };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      // console.log("Unknown action type:", action.type); // Debug log
      return state;
  }
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, getInitialCart());

  // Add debugging to see when state changes
  useEffect(() => {
    // console.log("Cart state changed:", state); // Debug log
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}