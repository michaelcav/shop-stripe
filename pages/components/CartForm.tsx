import React, { useState } from 'react'

export default function CartForm() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div>
    <input
      className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 "
      type="text"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      placeholder="Street address, number"
    />
    <input
      className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 "
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="City and postal code"
    />
    <input
      className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 "
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Your name"
    />
    <input
      className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 "
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email address"
    />
  </div>
  )
}
