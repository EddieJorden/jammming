import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		// this.state.searchResults = {
		// 	// searchResults: [{ nameId }, { artist }, { album }, { id }],
		// };

		this.state = {
			searchResults: [
				{ name: 'name1', artist: 'artits1', album: 'album1', id: '1' },
				{ name: 'name2', artist: 'artits2', album: 'album2', id: '2' },
				{ name: 'name3', artist: 'artits3', album: 'album3', id: '3' },
			],
		};
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
						<SearchResults searchResults={this.state.searchResults} />
						<PlayList />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
