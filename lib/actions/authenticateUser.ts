import { token } from "./accessToken";

export const authenticateUser = async (email: string) => {    
  try {
    const response = await fetch(
      "https://api.blog.redberryinternship.ge/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );

    if (response.status === 204) {
      return true; // Authentication successful
    } else {
      throw new Error(`Authentication failed. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return false; // Authentication failed
  }
};
