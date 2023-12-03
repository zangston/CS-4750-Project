async function getAccessToken() {
    try {
        const url = "https://accounts.spotify.com/api/token";
        const clientId = "94df018fc56b4670b9629a18665fa877";
        const secretFilename = "spotify-api/spotify-secret-key.txt";
    
        // Read the client secret from the file
        const clientSecret = await readSecretKey(secretFilename);
    
        const data = new URLSearchParams();
        data.append("grant_type", "client_credentials");
        data.append("client_id", clientId);
        data.append("client_secret", clientSecret);
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const responseData = await response.json();
        return responseData.access_token;
      } catch (error) {
        console.error("Error:", error);
        throw error; // Rethrow the error for further handling
      }
}

async function readSecretKey(filename) {
    try {
      const response = await fetch(filename);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      return text.trim(); // Trim any leading/trailing whitespaces
    } catch (error) {
      console.error('Error reading the file:', error);
      throw error; // Rethrow the error for further handling
    }
  }