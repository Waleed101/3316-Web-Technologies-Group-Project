import React from 'react'

import './css/TrackView.css'

export default class TrackView extends React.Component{
    render(){
        console.log(this.props.arr)

        const COLORS = ["pill red", "pill yellow", "pill green", "pill cyan", "pill blue", "pill purple"]

        let genre = []
        
        this.props.arr.genres.forEach(g => {
            genre.push(<div class={COLORS[g.id % (COLORS.length)]}>{g.title}</div>)
        })

        return(
            <div class="track">
                <h3 class="title">{this.props.arr.title}</h3>
                <p>{this.props.arr.name}</p>
                <hr />
                <div>
                    {genre}
                </div>
            </div>
        )
    }
}