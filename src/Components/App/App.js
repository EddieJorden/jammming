import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';
// import Track from '../Track/Track';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.addTrack = this.addTrack.bind(this);

		this.state = {
			searchResults: [
				{ name: 'name1', artist: 'artits1', album: 'album1', id: '1' },
				{ name: 'name2', artist: 'artits2', album: 'album2', id: '2' },
				{ name: 'name3', artist: 'artits3', album: 'album3', id: '3' },
			],
			playlistName: 'playlistName',
			playlistTracks: [
				{
					name: 'playlistName1',
					artist: 'playlistArtits1',
					album: 'playlistAlbum1',
					id: 'a',
				},
				{
					name: 'playlistName2',
					artist: 'playlistArtits2',
					album: 'playlistAlbum2',
					id: 'b',
				},
				{
					name: 'playlistName3',
					artist: 'playlistArtits3',
					album: 'playlistAlbum3',
					id: 'c',
				},
			],
		};
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

	render() {
		return (
			<div>
				<h1>
					Jam<span className="highlight">mm</span>ing
				</h1>
				<div className="App">
					<SearchBar />
					<div className="App-playlist">
						<SearchResults
							onAdd={this.addTrack}
							searchResults={this.state.searchResults}
						/>
						<PlayList
							playListName={this.state.playlistName}
							playlistTracks={this.state.playlistTracks}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
