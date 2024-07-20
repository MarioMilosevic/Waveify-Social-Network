import { baseUrl } from "./constants";

// export const login = async (email: string, password: string) => {
//   try {
//     const response = await fetch(`${baseUrl}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });
//     // razlicito metoda url payload...

//     if (!response.ok) {
//       const errorText = await response.text();
//       const errorData = JSON.parse(errorText);
//       throw new Error(errorData.error.message);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("There was a problem with the fetch operation:", error);
//     throw error;
//   }
// };

// export const getCurrentUser = async () => {
//   const jwt = localStorage.getItem("jwt");

//   if (!jwt) return;

//   const response = await fetch(`${baseUrl}/accounts/me`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + jwt,
//     },
//   });

//   try {
//     if (response.status === 400) {
//       const { error } = await response.json();
//       console.log(error);
//       return;
//     }

//     const { account } = await response.json();
//     return account;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Could not get the user");
//   }
// };

// export const getPosts = async () => {
//   const jwt = localStorage.getItem("jwt");

//   if (!jwt) return;

//   const response = await fetch(`${baseUrl}/posts`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + jwt,
//     },
//   });
//   console.log(response);

//   try {
//     if (response.status === 400) {
//       const { error } = await response.json();
//       console.log(error);
//       return;
//     }

//     const { posts } = await response.json();
//     return posts;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Could not get the user");
//   }
// };

// // export const fetchData = async (method: string, endpoint: string, payload) => {
// //   let response;
// //   if (endpoint === "login") {
// //     response = await fetch(`${baseUrl}/login`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ payload }),
// //     });
// //   } else {
// //     const jwt = localStorage.getItem("jwt");
// //     if (!jwt) return;
// //     response = await fetch(`${baseUrl}/${endpoint}`, {
// //       method: "GET",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: "Bearer " + jwt,
// //       },
// //     });

// //     if (!response.ok) {
// //       const errorText = await response.text();
// //       const errorData = JSON.parse(errorText);
// //       throw new Error(errorData.error.message);
// //     }

// //     const data = await response.json();
// //     return data;
// //   }
// // };

export const fetchData = async (
  method: string,
  endpoint: string,
  payload?: { email: string; password: string }
) => {
  try {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    const options: {
      method: string;
      headers: { [key: string]: string };
      body?: string;
    } = {
      method,
      headers,
    };

    if (endpoint !== "login") {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) throw new Error("No JWT found");
      headers["Authorization"] = "Bearer " + jwt;
    }

    if (method === "POST" && payload) {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(`${baseUrl}/${endpoint}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      const errorData = JSON.parse(errorText);
      throw new Error(errorData.error.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

