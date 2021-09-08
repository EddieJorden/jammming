import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';
import PlaylistList from '../PlaylistList/PlaylistList';

class PlayList extends React.Component {
	constructor(props) {
		super(props);
		console.log('props', props)
		this.handleNameChange = this.handleNameChange.bind(this);

		this.playlistListArray = props.playListName
		// console.log('this.props in being passed down from app to playlist', this.playlistListArray)
	}

	

	handleNameChange(event) {
		this.props.onNameChange(event.target.value);
	}

	render() {
		return (
			<div className="Playlist">
				<input
					type="text"
					defaultValue={'New Playlist'}
					onChange={this.handleNameChange}
				/>
				<div>saved playlists below here</div>
				<PlaylistList playlistArray={this.playlistListArray}/>
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
