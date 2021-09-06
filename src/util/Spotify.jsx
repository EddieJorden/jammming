



let accessToken = '';
let userId = 'fred'


const clientId = '61f83afec4ac462b90b05d4150d419ea';
const redirectUri = 'http://localhost:3000/';


const Spotify = {


	getCurrentUserId() {	
		const headers = { Authorization: `Bearer ${accessToken}`}

		return fetch(`https://api.spotify.com/v1/me`, {
			headers: headers,
		})
			.then((response) => response.json())
			.then((jsonResponse) => {
				userId = jsonResponse.id
				console.log('userId inside Spotify.getCurrentUserId verification', userId)
		})
	},			
	

	getAccessToken() {
		if (accessToken) {
			console.log('accessToken', accessToken)
			return accessToken;
		}

		// check for access token match
		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

		if (accessTokenMatch && expiresInMatch) {
			accessToken = accessTokenMatch[1];
			const expiresIn = Number(expiresInMatch[1]);

			// clears parameters allowing to grab new access token when it expires
			window.setTimeout(() => (accessToken = ''), expiresIn * 1000);

			window.history.pushState('Access Token', null, '/');
			return accessToken;
		} else {
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
			window.location = accessUrl;
		}
	},


	search(term) {
		// possible other url?
		// return fetch(`https://api.spotify.com/v1/search`)
		if (term === "") {
			console.log("no term entered")
			
		}

		console.log('accessToken', accessToken)
		console.log('userId verification', userId)
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				
			},
		})
			.then((response) => {
				console.log('response', response 
				

				
				
				)
				return response.json();
			})
			.then((jsonResponse) => {
				if (!jsonResponse.tracks) {
					return [];
				}
				return jsonResponse.tracks.items.map((track) => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri,
				}));
			});
	},

	consoleDotLogMethod(name) {
		console.log(name)
	},


	// this is the code running in app.js 

	// savePlaylist() {
	// 	const trackUris = this.state.playlistTracks.map((track) => track.uri);
	// 	Spotify.savePlaylist(this.state.playlistName, trackUris)
	// 		.then(() => {
	// 		this.setState({ searchResults: [] });
	// 	});
	// }




	savePlaylist(name, trackUris) {
		console.log('trackUris', trackUris)
		console.log('userId', userId)
		const headers = { Authorization: `Bearer ${accessToken}` };

		
		

				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
					headers: headers,
					method: 'POST',
					body: JSON.stringify({ name: name }),
				})
					.then((response) => response.json())
					
					.then((jsonResponse) => {
						const playlistId = jsonResponse.id;
						console.log('jsonResponse.id', jsonResponse)
						return fetch(
							`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
							{
								headers: headers,
								method: 'POST',
								body: JSON.stringify({ uris: trackUris }),
							}
						);		
						
						

					});
		
	},


	getUserPlaylists() {
		const headers = { Authorization: `Bearer ${accessToken}` };
		console.log('userId inside getUserPlaylists', userId)
		
		return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
			headers: headers,
		})
		.then((response) => {
			console.log('userId inside of getUserPlaylist', userId)
			console.log('response.json in Spotify.getUserPlaylist', response)
			return response.json();
		})
		.then((jsonResponse) => {
			console.log('jsonResponse in Spotify.getUserPlaylist', jsonResponse)
			// console.log('jsonResponse[0]', jsonResponse[0])
		})	

	}
}

// const currentUserId = Spotify.getCurrentUserId()
// Spotify.getCurrentUserId(userId)
// console.log(userId)
Spotify.consoleDotLogMethod()



export default Spotify;
