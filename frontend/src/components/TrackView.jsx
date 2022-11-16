import React from 'react'

import './css/TrackView.css'

export default class TrackView extends React.Component{
    render(){
        console.log(this.props.arr)

        const ADD_TO_PLAYLIST_MSG = "Add to Playlist"
        const REMOVE_FROM_PLAYLIST_MSG = "Remove from Playlist"

        const COLORS = ["pill red", "pill yellow", "pill green", "pill cyan", "pill blue", "pill purple"]

        let genre = []
        
        this.props.arr.genres.forEach(g => {
            genre.push(<div class={COLORS[g.id % (COLORS.length)]}>{g.title}</div>)
        })

        let isAdded = false
        const id = "addTo" + this.props.arr.id

        const select = () => {
            if (!isAdded) {
                this.props.selectTrack(this.props.arr.id)
            } else {
                this.props.removeTrack(this.props.arr.id)
            }

            document.getElementById(id).innerHTML = isAdded ? ADD_TO_PLAYLIST_MSG : REMOVE_FROM_PLAYLIST_MSG 
            isAdded = !isAdded
        }


        return(
            <div class="track">
                <h3 class="title">{this.props.arr.title}</h3>
                <p>{this.props.arr.name}</p>
                <hr />
                <div>
                    {genre}
                </div>
                <button id={id} onClick={select}>
                    {ADD_TO_PLAYLIST_MSG}
                </button>
            </div>
        )
    }
}