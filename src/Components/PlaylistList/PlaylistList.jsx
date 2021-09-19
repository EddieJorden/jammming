import React from 'react'

const PlaylistList = ({playlistArray}) => {
    
    return(
        <div>
            {playlistArray && playlistArray.length > 0
                && playlistArray.map((playlist, i) => <div key={i}>{playlist}</div>)}
        </div>
    )
}

export default PlaylistList