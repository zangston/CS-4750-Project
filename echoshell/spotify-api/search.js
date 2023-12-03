function searchSpotify(searchQuery, searchType) {
    return getAccessToken()
        .then(token => {
            const requestUrl = `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}`;

            return fetch(requestUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (searchType == 'track' && data.tracks && data.tracks.items && data.tracks.items.length > 0) {
                        console.log(data)
//                        const trackItems = data.tracks.items;
                        let responseString = '';
                        data.tracks.items.forEach(trackInfo => {
                            const artist = trackInfo.artists.map(artist => artist.name);
                            const title = trackInfo.name;
                            const year = new Date(trackInfo.album.release_date).getFullYear();
                            const duration = formatDuration(trackInfo.duration_ms);
                            const trackNumber = trackInfo.track_number;
                            responseString += `Artist: ${artist}, Song Title: ${title}, Year: ${year}, Track Number: #${trackNumber}, Duration: ${duration} minutes\r\n`;
                        });
                        return responseString;

                    } else if (searchType === 'album' && data.albums && data.albums.items && data.albums.items.length > 0) {
                        console.log(data);
//                        return "Haven't done albums yet";
                        let responseString = '';
                        data.albums.items.forEach(albumInfo => {
                            const albumName = albumInfo.name;
                            const artistName = albumInfo.artists.map(artist => artist.name);
                            const year = new Date(albumInfo.release_date).getFullYear();
                            responseString += `Album: ${albumName} (${year}), Artist: ${artistName}\r\n`;
                        });
                        return responseString;

                    } else if (searchType == 'artist' && data.artists && data.artists.items && data.artists.items.length > 0) {
                        console.log(data)
                        let responseString = '';
                        data.artists.items.forEach(artistInfo => {
                            const artistName = artistInfo.name;
                            const followers = artistInfo.followers.total;
                            responseString += `Artist: ${artistName}, Followers: ${followers}\r\n`;
                        });
                        return responseString;
                    }
                    else {
                        return "No results found";
                    }
                });
        })
}

function formatDuration(durationInMs) {
    const minutes = Math.floor(durationInMs / 60000);
    const seconds = ((durationInMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}
