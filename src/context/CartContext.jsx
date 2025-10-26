import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const initialState = {
  items: [],
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product } = action.payload
      const existingItem = state.items.find((item) => item.product.id === product.id)

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      return {
        items: [...state.items, { product, quantity: 1 }],
      }
    }
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload

      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.product.id !== productId),
        }
      }

      return {
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      }
    }
    case 'REMOVE_ITEM': {
      const { productId } = action.payload
      return {
        items: state.items.filter((item) => item.product.id !== productId),
      }
    }
    case 'CLEAR_CART':
      return initialState
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = useCallback(
    (product) => {
      dispatch({ type: 'ADD_ITEM', payload: { product } })
    },
    [dispatch],
  )

  const updateQuantity = useCallback(
    (productId, quantity) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
    },
    [dispatch],
  )

  const removeFromCart = useCallback(
    (productId) => {
      dispatch({ type: 'REMOVE_ITEM', payload: { productId } })
    },
    [dispatch],
  )

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [dispatch])

  const value = useMemo(() => {
    const totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
    const totalPrice = state.items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0,
    )

    return {
      items: state.items,
      totalItems,
      totalPrice,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }
  }, [state.items, addToCart, updateQuantity, removeFromCart, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
