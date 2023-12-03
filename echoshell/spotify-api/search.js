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
                        const trackInfo = data.tracks.items[0];
                        const artist = trackInfo.artists.map(artist => artist.name);
                        const title = trackInfo.name;
                        const year = new Date(trackInfo.album.release_date).getFullYear();
                        const duration = formatDuration(trackInfo.duration_ms);
                        const trackNumber = trackInfo.track_number;
                        const responseString = `Artist: ${artist}, Song Title: ${title}, Year: ${year}, Track Number: #${trackNumber}, Duration: ${duration} minutes`;
                        return responseString;
                    } else if (searchType == 'album') {
                        console.log(data);
                        return "Haven't done albums yet";
                    } else if (searchType == 'artist' && data.artists && data.artists.items && data.artists.items.length > 0) {
                        console.log(data)
                        const artistInfo = data.artists.items[0];
                        const artistName = artistInfo.name;
                        const followers = artistInfo.followers.total;
                        const responseString = `Artist: ${artistName}, Followers: ${followers}`;
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
