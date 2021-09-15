



let accessToken = '';
let userId = 'fred'
let playlistArray = []


const clientId = '61f83afec4ac462b90b05d4150d419ea';
const redirectUri = 'http://localhost:3000/';


const Spotify = {

	async fetchUserStuff() {
		
			await this.getAccessToken()
			await this.getCurrentUserId()
			await this.getUserPlaylists()
			
			return {
				accessToken: accessToken,
				userId: userId,
				playlistArray: playlistArray
			}
			
		
		
	},
	

	getCurrentUserId() {	

		const headers = { Authorization: `Bearer ${accessToken}`}

		return fetch(`https://api.spotify.com/v1/me`, {
			headers: headers,
		})
			.then((response) => response.json())
			.then((jsonResponse) => {
				userId = jsonResponse.id
				// console.log('userId inside Spotify.getCurrentUserId verification', userId)
				return userId
		})
	},			
	

	getAccessToken() {
		if (accessToken) {
			// console.log('accessToken', accessToken)
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


	getUserPlaylists() {
		const headers = { Authorization: `Bearer ${accessToken}` };
		// console.log('userId inside getUserPlaylists', userId)
		
		// console.log('playlistArray of items', playlistArray)

		
		return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
			headers: headers,
		})
		.then((response) => {
			// console.log('userId inside of getUserPlaylist', userId)
			// console.log('response.json in Spotify.getUserPlaylist', response)
			return response.json();
		})
		.then((jsonResponse) => {
			// console.log('jsonResponse in Spotify.getUserPlaylist', jsonResponse.items)
			// console.log('jsonResponse[0]', jsonResponse[0])
			// playlistArray.push(jsonResponse[i].name)
			// 	console.log(playlistArray)
			// console.log('jsonResponse', jsonResponse)
			
			
			for(let i = 0; i < jsonResponse.items.length; i++) {
				
				// console.log('jsonResponse[i] in iterator', jsonResponse.items[i])
				playlistArray.push(jsonResponse.items[i].name)
				
			}
			// console.log('playlistArray inside Spotify.getUserPlaylists', playlistArray)


			
			// array of objects
			return playlistArray
			
			
			// console.log('playlistArray from Spotify.getUserPlaylists', playlistArray[0].name)
		})	

	},


	search(term) {
		// possible other url?
		// return fetch(`https://api.spotify.com/v1/search`)
		if (term === "") {
			// console.log("no term entered")
			
		}

		// console.log('accessToken', accessToken)
		// console.log('userId verification', userId)
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				
			},
		})
			.then((response) => {
				// console.log(response.json)
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

	


	// this is the code running in app.js 

	// savePlaylist() {
	// 	const trackUris = this.state.playlistTracks.map((track) => track.uri);
	// 	Spotify.savePlaylist(this.state.playlistName, trackUris)
	// 		.then(() => {
	// 		this.setState({ searchResults: [] });
	// 	});
	// }




	savePlaylist(name, trackUris) {
		// console.log('trackUris', trackUris)
		// console.log('userId', userId)
		const headers = { Authorization: `Bearer ${accessToken}` };

		
		

				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
					headers: headers,
					method: 'POST',
					body: JSON.stringify({ name: name }),
				})
					.then((response) => response.json())
					
					.then((jsonResponse) => {
						const playlistId = jsonResponse.id;
						// console.log('jsonResponse.id', jsonResponse)
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



}

// console.log('this.fetchUserStuff', Spotify.fetchUserStuff())
// const currentUserId = Spotify.getCurrentUserId()
// Spotify.getCurrentUserId(userId)
// console.log(userId)




export default Spotify;
