import TrackList from './TrackList';
import './PlayList.class';

class Playlist extends React.Component {
	render() {
		return (
			<div className="Playlist">
				<input defaulValue={'New Playlist'} />
				{/* <!-- Add a TrackList component --> */}
				<button className="Playlist-save">SAVE TO SPOTIFY</button>
			</div>
		);
	}
}

export default Playlist;
