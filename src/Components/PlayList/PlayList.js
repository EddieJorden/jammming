import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
	constructor(props) {
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(event) {
		this.props.onNameChange(event.target.value);
	}

	render() {
		return (
			<div className="Playlist">
				<input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
				<TrackList
					onRemove={this.props.onRemove}
					isRemoval={true}
					tracks={this.props.playlistTracks}
				/>
				<button className="Playlist-save" onClick={this.props.onSave}>
					SAVE TO SPOTIFY
				</button>
			</div>
		);
	}
}

export default PlayList;
