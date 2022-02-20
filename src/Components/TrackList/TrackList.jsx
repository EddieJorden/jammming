import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';


class TrackList extends React.Component {
	logvalues() {
		// console.log('{this.props.track.album} | {this.props.track.artist}', <Track/>)
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
