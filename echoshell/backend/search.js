function searchSong(searchQuery) {
    response = ''

    getAccessToken()
    .then(token => {
      // Do something with the token
      // console.log("Token:", token);

      const requestUrl = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`;
      
      fetch(requestUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          console.log(data);
        })     
    })

    return response;
}
