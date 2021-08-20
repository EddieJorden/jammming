import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';
import PlayList from '../PlayList/PlayList';

class TrackList extends React.Component {
	checkForTrack() {
		
		if(PlayList.track === TrackList.track) {
			console.log(`don't return`)
		}else console.log('return')
	}
	logvalues() {
		console.log('{this.props.track.album} | {this.props.track.artist}', <Track/>)
	}

	render(track) {
		return (
			<div className="TrackList">
				
				{true ? this.props.tracks.map((track) => {
					return (
						<Track
							onAdd={this.props.onAdd}
							onRemove={this.props.onRemove}
							isRemoval={this.props.isRemoval}
							track={track}
							key={track.id}
						/>
					);
				}) : 'black'}
			</div>
		);
	}
}

export default TrackList;
