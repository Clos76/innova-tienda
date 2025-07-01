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

function cartReducer(state = initialState, action) {
  const items = state.items || [];
  switch (action.type) {
    case "ADD_ITEM":
      const existingIndex = items.findIndex(
        item => item.id === action.payload.id && item.talla === action.payload.talla
      );
      if (existingIndex >= 0) {
        const updatedItems = [...items];
        updatedItems[existingIndex].cantidad += action.payload.cantidad;
        return { ...state, items: updatedItems };
      }
      return { ...state, items: [...items, action.payload] };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: items.filter(
          item => !(item.id === action.payload.id && item.talla === action.payload.talla)
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
