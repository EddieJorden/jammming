import React from 'react';
// import Spotify from '../../util/Spotify';
// import Spotify from '../../util/Spotify';
import './SearchBar.css';

class SearchBar extends React.Component {


	constructor(props) {


		super(props);
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.state = { term: '' };
		this.handleKeypress = this.handleKeypress.bind(this)
		console.log({props})
	}

	search() {
		if (this.state.term) {

			this.props.onSearch(this.state.term);
		} return
		
	}


	handleTermChange(event) {
		// Spotify.getCurrentUserId()
		this.setState({ term: event.target.value });
		console.log(this.state.term)
	}

	handleKeypress(e) {
		if (e.charCode === 13) {
			console.log(e)
			this.search()
		}
	}

	render() {
		return (
			<div className="SearchBar">
				<input
					placeholder="Enter A Song, Album, or Artist"
					onChange={this.handleTermChange}
					onKeyPress={this.handleKeypress}
				/>
				<button onClick={this.search} className="SearchButton">
					SEARCH
				</button>
			</div>
		);
	}


}


export default SearchBar;