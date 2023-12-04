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
                        console.log(data);
                        let responseString = '';
                        data.tracks.items.slice(0, 5).forEach(trackInfo => {
                            const song_id = trackInfo.id;
                            console.log(song_id);
                            const artists = trackInfo.artists.map(artist => artist.name);
                            const artist = artists[0]
                            console.log(artist)
                            const artist_id_map = trackInfo.artists.map(artist => artist.id);
                            console.log(artist_id_map.length);
                            console.log(artist_id_map[0]);
                            const artist_id = artist_id_map[0];
                            console.log(artist_id);
                            const artist_followers = 0;
                            console.log(artist_followers);
                            const title = trackInfo.name;
                            const year = new Date(trackInfo.album.release_date).getFullYear();
                            const streams = 0;
                            console.log(streams);
                            const preduration = trackInfo.duration_ms;
                            console.log(preduration);
                            const duration = formatDuration(trackInfo.duration_ms);
                            const trackNumber = trackInfo.track_number;
                            responseString += `${artists}: ${title} (${year}), Track: #${trackNumber}, Duration: ${duration} mins\r\n`;
                            const dataToSend = {
                                key1: searchType,
                                key2: song_id,
                                key3: artist_id,
                                key4: title,
                                key5: year,
                                key6: streams,
                                key7: preduration,
                                key8: trackNumber,
                                key9: artist,
                                key10: artist_followers
                              };
                            fetch('backend/populate.php', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(dataToSend)
                              })
                                .then(response => response.json())
                                .then(data => {
                                  console.log(data);
                                })
                                .catch(error => {
                                  console.error('Error:', error);
                                });
                        });
                        return responseString;

                    } else if (searchType == 'album' && data.albums && data.albums.items && data.albums.items.length > 0) {
                        console.log(data);
                        let responseString = '';
                        data.albums.items.slice(0, 5).forEach(albumInfo => {
                            const albumName = albumInfo.name;
                            const album_id = albumInfo.id;
                            const artistName = albumInfo.artists.map(artist => artist.name);
                            const artist_name = artistName[0];
                            console.log(artist_name);
                            const artist_id_map = albumInfo.artists.map(artist => artist.id);
                            const artist_id = artist_id_map[0];
                            console.log(artist_id);
                            const artist_followers = 0;
                            const year = new Date(albumInfo.release_date).getFullYear();
                            responseString += `${artistName}: ${albumName} (${year})\r\n`;
                            const dataToSend = {
                                key1: searchType,
                                key2: album_id,
                                key3: albumName,
                                key4: year,
                                key5: artist_id,
                                key6: artist_name,
                                key7: artist_followers
                              };
                            fetch('backend/populate.php', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(dataToSend)
                              })
                                .then(response => response.json())
                                .then(data => {
                                  console.log(data);
                                })
                                .catch(error => {
                                  console.error('Error:', error);
                                });
                        });
                        return responseString;

                    } else if (searchType == 'artist' && data.artists && data.artists.items && data.artists.items.length > 0) {
                        console.log(data);
                        let responseString = '';
                        data.artists.items.slice(0, 5).forEach(artistInfo => {
                            const artist_id = artistInfo.id;
                            console.log(artist_id);
                            const artistName = artistInfo.name;
                            console.log(artistName);
                            const followers = artistInfo.followers.total;
                            const artist_followers = 0;
                            responseString += `${artistName} \r\n`;
                            const dataToSend = {
                                key1: searchType,
                                key2: artist_id,
                                key3: artistName,
                                key4: artist_followers
                              };
                            fetch('backend/populate.php', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(dataToSend)
                              })
                                .then(response => response.json())
                                .then(data => {
                                  console.log(data);
                                })
                                .catch(error => {
                                  console.error('Error:', error);
                                });
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
