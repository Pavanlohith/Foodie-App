import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const StoreContext = createContext(null)

const StoreContextProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState({})
 const url = "https://foodie-app-eight-tau.vercel.app"  // NO trailing slash

  const [token, setToken] = useState("")
  const [food_list, setFood_list] = useState([]) // ✅ must be array

  // Load cart from backend
  const fetchCartFromDB = async (userToken) => {
    if (!userToken) return
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {}, // userId comes from token
        { headers: { token: userToken, "Content-Type": "application/json" }, credentials: "include" }

      )
      if (response.data.success) {
        setCartItems(response.data.rawCart || {}) // update local cart state
      }
    } catch (e) {
      console.error("Failed to fetch cart:", e)
    }
  }

  // Load food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list")
      setFood_list(response.data.data || [])
    } catch (error) {
      console.error("Error fetching food list:", error)
      setFood_list([])
    }
  }

  // Add to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))

    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        )
        if (!response.data.success) {
          alert(response.data.message)
          // rollback
          setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) - 1
          }))
        }
      } catch (e) {
        console.error(e)
        setCartItems((prev) => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) - 1
        }))
      }
    }
  }

  // Remove from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev
      const updatedCart = { ...prev }
      updatedCart[itemId] -= 1
      if (updatedCart[itemId] <= 0) delete updatedCart[itemId]
      return updatedCart
    })

    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        )
        if (!response.data.success) {
          alert(response.data.message)
          setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
          }))
        }
      } catch (e) {
        console.error(e)
        setCartItems((prev) => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) + 1
        }))
      }
    }
  }

  // Get total amount
  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((p) => p._id === item)
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item]
      }
    }
    return totalAmount
  }

  // On app start: load token, food, and cart
  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
      fetchCartFromDB(savedToken) //  load cart from DB
    }
    fetchFoodList()
  }, [])

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
