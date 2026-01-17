import React, { useEffect } from 'react'
import './verify.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Verify = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const url = "http://localhost:4000"

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search)

      const success = params.get("success")
      const orderId = params.get("orderId")

      if (!orderId) {
        navigate('/')
        return
      }

      try {
        const response = await axios.post(
          url + "/api/order/verify",

          { success, orderId },
          { headers: { "Content-Type": "application/json" }, credentials: "include" }
        )

        if (response.data.success) {
          navigate('/myorders')
        } else {
          navigate('/home')
        }
      } catch (error) {
        console.log(error)
        navigate('/cart')
      }
    }

    verifyPayment()
  }, [location, navigate])

  return (
    <div className="verify">
      <div className="loader"></div>
      <p>Verifying payment...</p>
    </div>
  )
}

export default Verify
