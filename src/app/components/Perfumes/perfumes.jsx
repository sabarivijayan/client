"use client"
import React, { useEffect, useState } from 'react'
import './perfumes.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

function Perfumes() {
  const [data, setData] = useState([])
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')

    // Check for token expiration during data fetch
    if (!token) {
      router.push('/signin')
      return
    }

    axios.get('http://localhost:4000/api/product/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.data.success) {
          setData(response.data.data)
        } else {
          console.error("Failed to fetch products")
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          // Redirect to sign-in if token is expired or unauthorized
          router.push('/signin')
        } else {
          console.error("Error fetching products:", error)
        }
      })
  }, [router])

  const handleAddToCart = (itemId) => {
    const token = Cookies.get('token')

    if (!token) {
      console.error("No authentication token found")
      router.push('/signin')
      return
    }

    axios.post('http://localhost:4000/api/cart/add', { itemId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.data.success) {
          console.log("Added to Cart")
        } else {
          console.error("Failed to add to cart")
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          // Redirect to sign-in if token is expired or unauthorized
          router.push('/signin')
        } else {
          console.error("Error adding to cart:", error)
        }
      })
  }

  return (
    <div className="collection-right">
      <div className="our-collections">Our Collections</div>
      <div className="results-info">
        <div className="results-count">Showing {data.length} results</div>
        <div className="sort-by">
          <span>Sorted by: <b>Popularity</b>
            <img className="mt-50" src="/img/down-arrow.svg" alt="" />
          </span>
        </div>
      </div>

      <div className="product-cards">
        {data.map((item) => (
          <div className="product-card" key={item._id}>
            <div className="text-center image-wrap">
              <div className="image-block">
                <img src={item.image} alt="Product" className="product-image" />
              </div>
              <div className="heart-wrapper">
                <img src="/img/heart.svg" alt="Heart" className="heart-image" />
              </div>
              <div className="badge-wrapper">
                <img src="/img/badge.svg" alt="Badge" className="badge-image" />
              </div>
            </div>

            <div className="details-block">
              <div className="head-1">{item.name}</div>
              <p className="sub-head-1">{item.description}</p>
              <p className="price">${item.price}</p>
              <button className="buy-button" onClick={() => handleAddToCart(item._id)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Perfumes
