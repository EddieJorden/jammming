import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar.jsx';
import SearchResults from '../SearchResults/SearchResults.jsx';
import PlayList from '../PlayList/PlayList.jsx';

import Spotify from '../../util/Spotify.jsx';






class App extends React.Component {
	constructor(props) {
		super(props);

		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
		this.userData = Spotify.fetchUserStuff()

		// console.log('this.userPlaylists', this.userPlaylists)
		// console.log('Spotify.getUserPlaylists()', Spotify.getUserPlaylists())
		// console.log('props object :) ', props)
		console.log('this.userData', this.userData)

		

		this.state = {

			searchResults: [],
			playlistName: 'playlistName',
			playlistTracks: [],
			// userDataObject: this.userDataFetch(),
			accessToken: Spotify.getAccessToken,
			userId: Spotify.getCurrentUserId,
			playlists: Spotify.fetchUserStuff
			

		}
		// console.log('this.state.userDataObject', this.state.userDataObject)
		// console.log('this.state.accessToken', this.state.accessToken)
		// console.log('userId: Spotify.getCurrentUserId()', this.state.userId)
		// console.log('this.state.playlists', this.state.playlists)
	}
	// createDataFetchObject() {
		
	// }

	// userDataFetch = async() => {
		// setTimeout(Spotify.userDataFetch() {}, 1000)
		

	// 	const accessToken = await Spotify.getAccessToken();
	// 	const userId  = await Spotify.getCurrentUserId();
	// 	const userPlaylist =  this.state

	// 	// console.log('this.userId', this.state.userId)
	// 	// console.log('playlists', this.state.playlists)
		
		 
	// 		this.state.userDataObject = {
	// 			accessToken: accessToken, 
	// 			userId: userId, 
	// 			playlists: userPlaylist
	// 		}

			

			// console.log('this.userDataObject.userId', this.userDataObject)
			// console.log('userId', Spotify.getCurrentUserId())
				
		
		// console.log(Spotify.getAccessToken())
		
		
		// await console.log('Spotify.getUserPlaylists()', Spotify.getUserPlaylists())
		
		
		

	// }
	// const userPlaylists = userDataFetch()
	// console.log('userPlaylists', userPlaylists)


	search(term) {
		Spotify.search(term).then((searchResults) => {
			this.setState({ searchResults: searchResults });
			
		});
	}

	addTrack(track) {
		let tracks = this.state.playlistTracks;
		if (
			this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
		) {
			return;
		}
		tracks.push(track);
		this.setState({ PlaylistTracks: tracks });
	}

	removeTrack(track) {
		let tracks = this.state.playlistTracks;
		tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
		this.setState({ playlistTracks: tracks });
	}

	updatePlaylistName(name) {
		this.setState({ playlistName: name });
	}



	savePlaylist() {
		const trackUris = this.state.playlistTracks.map((track) => track.uri);
		// console.log('trackUris inside savePlaylist', trackUris)

		if (trackUris.length <= 0) {
			// console.log('trackUris is <= 0', trackUris)
			return
		} else {
			Spotify.savePlaylist(this.state.playlistName, trackUris)
			
			.then(() => {
			this.setState({ searchResults: [] });
			// console.log('this.state.playlistName', this.state.playlistName)
			// console.log('this.state = ', this.state)
			// console.log('trackUris after fetch', trackUris)
		});
		}
		
		
	

		// console.log('this.userPlaylists', userPlaylists)
	}
	

	render(userPlaylists) {
		return (
			<div>
				<h1>
					Jam<span className="highlight">mm</span>ing
				</h1>
				<div className="App">
					<SearchBar onSearch={this.search} />
					<div className="App-playlist">
						<SearchResults
							onAdd={this.addTrack}
							searchResults={this.state.searchResults}
						/>
						<PlayList
							playListName={this.state.playlistName}
							playlistTracks={this.state.playlistTracks}
							onRemove={this.removeTrack}
							onNameChange={this.updatePlaylistName}
							onSave={this.savePlaylist}
							// playlistList={this.userDataObject}
							userData={this.userData}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
