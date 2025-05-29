import useZustandStore from "@/store/useStore";
// import useStore from "@/store/useStore";
import configVariables from "@/variables/configVariables";
export default async function fetchApiData<T>(
    endpoint: string,
    options?: {
      headers?: Record<string, string>;
      requireAuth?: boolean;
      checkAccessToken?: boolean;
    }
  ): Promise<T> {
    const baseUrl = configVariables?.baseUrl; // Ensure this is defined in .env.local
    const url = `${baseUrl}${endpoint}`;
  
    try {
      let headersData: Record<string, string> = options?.headers || {};
  
      if (options?.requireAuth || options?.checkAccessToken) {
        const accessToken = useZustandStore.getState().accessToken;
        
        if (accessToken) {
          headersData = {
            ...headersData,
            Authorization: 'Bearer ' + accessToken,
          };

        } 
        // else {
        //   if (!options?.checkAccessToken) {
        //     throw new Error("Access token is required but not available.");
        //   }
        // }
      }
  
      const response = await fetch(url, {
        headers: headersData,
        credentials: "include",
      });
  
      if (response.ok) {
        const data: T = await response.json();
        return data;
      } else {
        const data: T = await response.json()
        console.log(data,'jvvhvv')
        throw new Error(`API call failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("API fetch error:", error);
      throw error;
    }
  }
  