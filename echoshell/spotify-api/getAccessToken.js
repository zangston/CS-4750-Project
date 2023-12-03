function getAccessToken() {
    const url = "https://accounts.spotify.com/api/token";
    const clientId = "94df018fc56b4670b9629a18665fa877";
    const clientSecret = "e499127474fb403d8ad2aac0ae8d7518";
  
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", clientId);
    data.append("client_secret", clientSecret);
  
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then(response => response.json())
      .then(data => data.access_token)
      .catch(error => {
        console.error("Error:", error);
        throw error; // Rethrow the error for further handling
      });
}