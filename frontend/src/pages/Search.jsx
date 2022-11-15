import { React, useState } from 'react';
import { useCookies } from 'react-cookie';

let url = require("../setup/api.setup.js")

function Search() {

    const [title, setTitle] = useState("")
    const [genre, setGenre] = useState("")
    const [artist, setArtist] = useState("")
    // const 

    const handleSelect = function(selectedItems) {
        const genres = []

        for (let i=0; i < selectedItems.length; i++) {
            genres.push(selectedItems[i].value)
        }

        setGenre(genres)
    }

    const search = (event) => {
        event.preventDefault();

        console.log("Searching...")
        console.log(genre)
    } 

    return (
        <form onSubmit={search}>
            <label> Title:
                <input
                    type = "text"
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)}
                />
            </label>
            <label> Artist:
                <input
                    type = "text"
                    value = {artist}
                    onChange = {(e) => setArtist(e.target.value)}
                />
            </label>
            <label> Genre:
                <select multiple={true} value={genre} onChange={(e) => {handleSelect(e.target.selectedOptions)}}>
                    <option value="Temp">Temp</option>
                    <option value="Temp1">Temp1</option>
                    <option value="Temp2">Temp2</option>
                </select>
            </label>
            <input type = "submit" />
        </form>
    );
}

export default Search;