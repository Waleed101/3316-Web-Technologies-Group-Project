import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

let url = require("../setup/api.setup.js")

function Search() {

    const [title, setTitle] = useState("")
    const [genre, setGenre] = useState([])
    const [artist, setArtist] = useState("")

    const [availGenres, setAvailGenres] = useState([])

    const handleSelect = function(selectedItems) {
        const genre = []

        for (let i=0; i < selectedItems.length; i++) {
            genre.push(selectedItems[i].value)
        }

        setGenre(genre)
    }

    const search = (event) => {
        event.preventDefault();

        let query = `?title=${title}&artist=${artist}&genres=${genre.join(",")}`

        fetch(url + "api/genre/" + query)
            .then(res => res.json())
                .then(res => {
                    console.log(res)
                })
    } 

    useEffect(() => {

        fetch(url + "api/genre/")
            .then(res => res.json())
                .then(res => {
                    let availGenres = []

                    res.forEach(ele => {
                        availGenres.push(<option value={ele.id.toString()}>{ele.title}</option>)
                    })

                    setAvailGenres(availGenres)

                })
    }, [])

    return (
        <div id="region">
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
                    <select id="genreSelect" multiple={true} value={genre} onChange={(e) => {handleSelect(e.target.selectedOptions)}}>
                        {availGenres}
                    </select>
                </label>
                <input type = "submit" />
            </form>
            <div id="result">

            </div>
        </div>
    );
}

export default Search;