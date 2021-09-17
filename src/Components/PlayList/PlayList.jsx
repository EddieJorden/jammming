import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';
import PlaylistList from '../PlaylistList/PlaylistList';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.playlistArray = props.userPlaylist
	}
	
	handleNameChange(event) {
		this.props.onNameChange(event.target.value);
	}
	
	render() {

		const {playlistArray} = this.props.userData
		
		return (
			<div className="Playlist">
				<input
					type="text"
					defaultValue={'New Playlist'}
					onChange={this.handleNameChange}
				/>
				<div>saved playlists below here</div>
				<PlaylistList playlistArray={playlistArray}/>
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

export default Playlist;
