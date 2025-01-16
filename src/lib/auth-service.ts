import axios from 'axios'

const api = axios.create({
  baseURL: '/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function register(data: {
  name: string
  email: string
  password: string
  role: 'Admin' | 'Vendor'
  loginProvider: 'Local'
}) {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simulate validation
  if (data.password.length < 6) {
    throw new Error('Password must be at least 6 characters')
  }
  
  // Simulate successful response
  return {
    user: {
      id: '1',
      name: data.name,
      email: data.email,
      role: data.role,
    },
    token: 'dummy_token_' + Math.random(),
  }
}

export async function login(data: {
  email: string
  password: string
}) {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simulate validation
  if (data.email !== 'test@example.com' || data.password !== 'password') {
    throw new Error('Invalid credentials')
  }
  
  // Simulate successful response
  return {
    user: {
      id: '1',
      name: 'Test User',
      email: data.email,
      role: 'vendor',
    },
    token: 'dummy_token_' + Math.random(),
  }
}

