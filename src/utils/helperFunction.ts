import { url } from "./constants";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    // razlicito metoda url payload...

    if (!response.ok) {
      const errorText = await response.text();
      const errorData = JSON.parse(errorText);
      throw new Error(errorData.error.message);
    }

    const data = await response.json();
    console.log("Response Data:", data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; 
  }
};
