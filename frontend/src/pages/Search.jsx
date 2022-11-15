import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

let url = require("../setup/api.setup.js")

function Search() {

    const [title, setTitle] = useState("")
    const [genre, setGenre] = useState([])
    const [artist, setArtist] = useState("")

    const [availGenres, setAvailGenres] = useState([])
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

    useEffect(() => {

        fetch(url + "api/genre/")
            .then(res => res.json())
                .then(res => {
                    // console.log(res)
                    let availGenres = []

                    res.forEach(ele => {
                        availGenres.push(<option value={ele.id.toString()}>{ele.title}</option>)
                    })

                    setAvailGenres(availGenres)

                })
    }, [])

    // getGenres()

    // getGenres()
    // console.log(availGenres)
    // console.log(availGenres.length)

    // getGenres()
    // let test = []

    // test.push(<option value="1">1</option>)
    // test.push(<option value="2">2</option>)

    // console.log(test)

    // let availGenres = '<option value="1">1</option>'
    // availGenres += '<option value="2">2</option>'
    // console.log(availGenres)

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
                <select id="genreSelect" multiple={true} value={genre} onChange={(e) => {handleSelect(e.target.selectedOptions)}}>
                    {availGenres}
                </select>
            </label>
            <input type = "submit" />
        </form>
    );
}

export default Search;