import React from 'react'



class PlaylistList extends React.Component {
    constructor(props) {
        super(props)
        // console.log('props from in PlaylistList', props.playlistArray)
        this.playListName = props.playlistArray.playListName
        // console.log('this.playListName', this.playListName)
        // console.log('working with props object', props)
    }

    
    playlistReturn() { 
        let playlistName = ''

        for (let i = 0; i < this.props.playlistArray.length; i++) {
            playlistName = this.props.playlistArray[i]
            return <div>{playlistName}</div>
        }

        
        
    }

    pushPlaylistNames() {
        <div>{this.playListName}</div> 
    }
    
    render() {
        return (
            <div className='saved-playlists' >
                {this.playlistReturn()}
            </div>
        )
    }
}

export default PlaylistList