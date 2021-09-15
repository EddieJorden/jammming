import React from 'react'



class PlaylistList extends React.Component {
    

    constructor(props) {
        super(props)
        // console.log('props from in PlaylistList', props.playlistArray)
        
        // console.log('this.playListName', this.playListName)
        // console.log('working with props object', props)
        console.log('playlist list props', props)
        
        this.state = {
            userData: props.userData,
            userPlaylistArray: {}
        }
        
    }


    
    playlistArray
    

    
    render() {
        return (
            <div className='saved-playlists' >
                {this.props.userData ? console.log('this.props.userData', this.props.userData) : 'loading...'}
            </div>
        )
    }
}

export default PlaylistList