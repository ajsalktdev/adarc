const ServerType = {
    Local: "local",
    Demo: "demo",
    Shameem: "shameem",
  };
  
  // Select the server type you want to use
  const server = ServerType.Demo; // Change this to ServerType.Local or ServerType.Shameem as needed
  
  const localBaseUrl = "http://127.0.0.1:8000/api/v1/";
  // const demoBaseUrl = "https://mrrobot007.pythonanywhere.com/api/v1/";
  const demoBaseUrl = "https://demo.adarcuae.com/api/v1/";
  const shameemBaseUrl = "http://192.168.1.82:8000/api/v1/"; // Replace with the actual Shameem URL if available
  
  const configVariables = {
    baseUrl:
      server === ServerType.Demo
        ? demoBaseUrl
        : server === ServerType.Shameem
        ? shameemBaseUrl
        : localBaseUrl,
  };
  
  export default configVariables;
  