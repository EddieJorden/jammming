


let accessToken = '';


const clientId = '61f83afec4ac462b90b05d4150d419ea';
const redirectUri = 'http://localhost:3000/';

let userId = 'fred'

const Spotify = {
	// const [userId, setUserId] = useState('')

	getAccessToken() {
		if (accessToken) {
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
		console.log(accessToken)
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				
			},
		})
			.then((response) => {
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


	savePlaylist(name, trackUris) {
		
		const headers = { Authorization: `Bearer ${accessToken}` };
		
		this.getCurrentUserId()



		// if (!name || !trackUris.length) {
		// 	return;
		// }
		// return fetch(`https://api.spotify.com/v1/me`, {
		// 	headers: headers,
		// })
		// 	.then((response) => response.json())
		// 	.then((jsonResponse) => {
		// 		userId = jsonResponse.id;


				return fetch(`https://api.spotify.com/v1/users /${userId}/playlists`, {
					headers: headers,
					method: 'POST',
					body: JSON.stringify({ name: name }),
				})
					.then((response) => response.json())
					.then((jsonResponse) => {
						const playlistId = jsonResponse.id;
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
		

		return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
			headers: headers,
		})
			.then((response) => response.json())
			.then((jsonResponse) => {
				userId = jsonResponse.id;
				return fetch()
					// headers: headers,
					// method: '',
					// body: JSON.stringify({})
				})
			
	},


	getCurrentUserId() {


		const headers = { Authorization: `Bearer ${accessToken}`}
		
		


		// if (!name || !trackUris.length) {
		// 	return;
		// }
		return fetch(`https://api.spotify.com/v1/me`, {
			headers: headers,
		})
			.then((response) => response.json())
			.then((jsonResponse) => {userId = jsonResponse.id})
			.then((userId) => console.log(userId))
	},			


		// if(userId === '') {
		// 	return fetch(`https://api.spotify.com/v1/me`, {
		// 		headers: headers,
		// 	})
		// 		.then((response) => response.json())
		// 		.then((jsonResponse) => {
		// 			userId = jsonResponse.id;
		// 			return userId
		// 		})
			

			
		// }else return userId
	
		
	


	
}

// const currentUserId = Spotify.getCurrentUserId()
// Spotify.getCurrentUserId(userId)
// console.log(userId)
Spotify.consoleDotLogMethod()



export default Spotify;
