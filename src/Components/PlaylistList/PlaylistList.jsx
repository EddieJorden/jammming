import React from 'react'
import './PlaylistLists.css'






class PlaylistLists extends React.Component {
    constructor(props) {
        super(props)
        this.search = this.search.bind(this)

    }

    // retrieveCurrentUserPlaylists() {
    
    // }

    search() {
        console.log("search button clicked")
    }

    render() {
        return (
            <div className="userPlaylists">
                User Playlist
                
            </div>
        )
    }
}

export default PlaylistLists