export const login = async (email: string, password: string) => {
  const url = "https://api.hr.constel.co/api/v1/login";
  const payload = {
    email: email,
    password: password,
  };

  console.log("Email:", email);
  console.log("Password:", password);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Network response was not ok: " + errorText);
    }

    const data = await response.json();
    console.log("Response Data:", data);
    // Handle the response data as needed
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};



