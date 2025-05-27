import useZustandStore from "@/store/useStore";
import configVariables from "@/variables/configVariables";

export default async function postApiData<T>(
  endpoint: string,
  body: unknown,
  headers?: HeadersInit,
  requireauth: boolean = false,
  checkAccessToken?: boolean,
  method: "POST" | "PUT" | "PATCH" = "POST" // Add method parameter with default "POST"
): Promise<T> {
  const baseUrl = configVariables?.baseUrl; 
  const url = `${baseUrl}${endpoint}`;

  try {
    let headersData: Record<any, any> = headers || {};

    if (requireauth || checkAccessToken) {
      const accessToken = useZustandStore.getState().accessToken;

      if (accessToken) {
        headersData = {
          ...headersData,
          Authorization: `Bearer ${accessToken}`,
        };
      } else {
        if (requireauth) {
          throw new Error("Access token is required but not available.");
        }
      }
    }

    const response = await fetch(url, {
      method: method, // Dynamically set method (POST, PUT, etc.)
      credentials: "include", // Ensures cookies are sent
      headers: {
        "Content-Type": "application/json",
        ...headersData,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${response.statusText}`
      );
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(`API ${method} error:`, error);
    throw error;
  }
}

// const handleClick = async () => {
//     const endpoint = "/api/submit";
//     const payload = {
//       name: "John Doe",
//       email: "john@example.com",
//     };

//     try {
//       const response = await postApiData<ApiResponse>(endpoint, payload);
//       console.log("API Response:", response);
//       if (response.success) {
//         alert("Data submitted successfully!");
//       } else {
//         alert("Submission failed: " + response.message);
//       }
//     } catch (error) {
//       console.error("Error during API submission:", error);
//       alert("An error occurred. Please try again.");
//     }