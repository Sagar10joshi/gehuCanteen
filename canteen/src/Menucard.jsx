"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import "./Menucard.css"

export default function MenuCard({ item }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      className="card-container"
    >
      <div id="hover"
        className={`card ${!item.available ? "unavailable" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="card-image-container">
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="card-image-wrapper"
          >
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="card-image" />
          </motion.div>

          <div className="card-tags">
            {item.tags.map((tag) => (
              <span key={tag} className={`tag ${tag === "Popular" ? "tag-popular" : "tag-secondary"}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="card-header">
          <div className="card-title-container">
            <h3 className="card-title">{item.name}</h3>
            <span className="card-price">${item.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="card-content">
          <p className="card-description">{item.description}</p>
        </div>

        <div className="card-footer">
          {item.available ? (
            <button className="add-button">
              <span className="add-icon">+</span>
              {/* <span>Add to Cart</span> */}
              <span onClick={() => handleAddToCart(item)}>Add to Cart</span>
            </button>
          ) : (
            <button className="unavailable-button" disabled>
              <span className="clock-icon">🕒</span>
              <span>Currently Unavailable</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}




