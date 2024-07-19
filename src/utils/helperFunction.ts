import { baseUrl } from "./constants";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
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

export const getCurrentUser = async () => {
  const jwt = localStorage.getItem('jwt')

  if (!jwt) return
  
  const response = await fetch(`${baseUrl}/accounts/me`, {
    method: 'GET',
    headers: {
      'Content-Type': "application/json",
      Authorization:"Bearer " + jwt
    }
  })

  try {
    if (response.status === 400) {
      const { error } = await response.json()
      console.log(error)
      return
    }

    const { account } = await response.json()
    return account
  } catch (error) {
    console.error(error)
  throw new Error('Could not get the user')  
  }
}

