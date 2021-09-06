import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';

import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

class App extends React.Component {
	constructor(props) {
		super(props);

		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);

		this.state = {
			searchResults: [],
			playlistName: 'playlistName',
			playlistTracks: [],
		};
	}

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
		console.log('trackUris', trackUris)
		Spotify.savePlaylist(this.state.playlistName, trackUris)
			.then(() => {
			this.setState({ searchResults: [] });
		});
	}
	

	render() {
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
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
