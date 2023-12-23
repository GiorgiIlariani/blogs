export const authenticateUser = async (email: string) => {
  const token = '9bb9745823102147085b39aed78e4580ecb0518ffcc8a0ec0c29a1b09abc8b61';
  
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
