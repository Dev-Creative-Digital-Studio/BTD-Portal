import axios from "axios";
import { User } from "./auth-types";

const api = axios.create({
  baseURL: "/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function register(data: {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Vendor";
  loginProvider: "Local";
}) {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate validation
  if (data.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  // Simulate successful response
  return {
    user: {
      id: "1",
      name: data.name,
      email: data.email,
      role: data.role,
    },
    token: "dummy_token_" + Math.random(),
  };
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<User> {
  // Simulating API call
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, data)
        .then((response) => {
          console.log(response.data);
          resolve(response.data.user);
        })
        .catch((error) => {
          reject("Invalid credentials"); // Return a rejected promise with the error
        });
    } catch (error) {
      reject("Login failed"); // Return a rejected promise with the error
    }
  });
}
