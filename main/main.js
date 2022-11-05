const url = "/api/"

const hideButtons = ["hide_genreContent", "hide_trackByNameContent", "hide_artistByNameContent", "hide_albumByTitleContent", "hide_artistByIDContent", "hide_trackByIDContent"]

function setup() {
    hideButtons.forEach(hB => {
        document.getElementById(hB).style.visibility = 'hidden'
    })
}

// Method to get all genres (Implements DB.1)

function getAllGenres() {
    console.log("Get Genres")
    
    let genreDiv = document.getElementById("genreContent")

    fetch(url + "genre")
        .then(res => res.json()
            .then(data => {
                console.log("Got Genres...")
                
                document.getElementById("hide_genreContent").style.visibility = 'visible'
                genreDiv.innerHTML = convertResultsToTable(["ID", "Name", "Parent ID"], data, ["id", "title", "parent"])
        })        
    )
}

// Function to search for track by matching album and track title (Implements DB.4 & FE.1a)

function getTracksByNameContent() {
    const input = document.getElementById("trackOrAlbumName").value

    console.log("Searching for tracks or tracks in albums with the following name/pattern: " + input)
    
    let trackDiv = document.getElementById("trackByNameContent")

    fetch(url + "track?title=" + input)
        .then(res => res.json()
            .then(data => {
                console.log("Got Tracks...")
                
                document.getElementById("hide_trackByNameContent").style.visibility = 'visible'
                console.log(data)
                trackDiv.innerHTML = convertResultsToTable(["Track ID"], data, ["trackID"])
        })        
    )
}

// Function to search for artists by their name (Implements FE.1b)

function getArtistsByName() {
    const input = document.getElementById("artistName").value

    console.log("Searching for artists following name/pattern: " + input)
    
    let artistDiv = document.getElementById("artistByNameContent")

    fetch(url + "artist?name=" + input)
        .then(res => res.json()
            .then(data => {
                console.log("Got Artists...")
                
                document.getElementById("hide_artistByNameContent").style.visibility = 'visible'
                console.log(data)
                artistDiv.innerHTML = convertResultsToTable(["Artist ID"], data, ["artistID"])
        })        
    )
}

// Function to search for albums by their name (Implements FE.1c)

function getAlbumsByTitle() {
    const input = document.getElementById("albumTitle").value

    console.log("Searching for albums following title/pattern: " + input)
    
    let artistDiv = document.getElementById("albumByTitleContent")

    fetch(url + "album?title=" + input)
        .then(res => res.json()
            .then(data => {
                console.log("Got Albums...")
                
                document.getElementById("hide_albumByTitleContent").style.visibility = 'visible'
                console.log(data)
                artistDiv.innerHTML = convertResultsToTable(["Album ID", "Title", "Artist Name", "Released", "Uploaded", "Track Count"], data, ["id", "title", "artistName", "dateReleased", "dateUploaded", "tracks"])
        })        
    )
}

// Function to get 6+ artist info by ID (Implements DB.2)

function getArtistByID() {
    const input = document.getElementById("artistID").value

    if(!isNumber(input)) {
        return
    }

    console.log("Retrieving artist with ID: " + input)
    
    let artistDiv = document.getElementById("artistByIDContent")

    fetch(url + "artist/" + input)
        .then(res => res.json()
            .then(data => {
                console.log("Got Artist.")
                
                document.getElementById("hide_artistByIDContent").style.visibility = 'visible'
                console.log(data)
                artistDiv.innerHTML = convertResultsToTable(["Name", "Contact", "Location", "Tags", "Year Start", "Year End"], [data], ["name", "contact", "location", "tags", "yearStart", "yearEnd"])
        })        
    )
}

// Function to get specified info about Track by ID (Implements DB.3)

function getTrackByID() {
    const input = document.getElementById("trackID").value

    if(!isNumber(input)) {
        return
    }

    console.log("Retrieving track with ID: " + input)
    
    let artistDiv = document.getElementById("trackByIDContent")

    fetch(url + "track/" + input)
        .then(res => res.json()
            .then(data => {
                console.log("Got Track.")
                
                document.getElementById("hide_trackByIDContent").style.visibility = 'visible'


                data["albumTitle"] = data["album"][0]["title"]
                data["artistName"] = data["artist"][0]["name"]

                console.log(data)

                artistDiv.innerHTML = convertResultsToTable(["Title", "Album ID", "Album Title", "Artist ID", "Artist Name", "Tags", "Date Created", "Date Recorded", "Duration", "Genres", "Number"], [data], 
                                                            ["title", "albumID", "albumTitle", "artistID", "artistName", "tags", "datePublished", "dateRecorded", "duration", "genres", "trackNum"])
        })        
    )
}

// Helper methods

function hideButton(div) {
    document.getElementById(div).innerHTML = ""
    document.getElementById("hide_" + div).style.visibility = 'hidden'
}

function convertResultsToTable(headers, data, attr) {
    if(data.length == 0) {
        return "No results found."
    }

    let result = "</br><table><tr>"
    headers.forEach(h => {result += ("<th>" + h + "</th>")})
    result += "</tr>"
    data.forEach(val => {
        result += "<tr>"
        attr.forEach(col => {result += ("<td>" + val[col] + "</td>")})
        result += "</tr>"
    })
    result += "</table>"
    console.log(result)
    return result
}

function isNumber(valToCheck, label) {
    if(/^\d+$/.test(valToCheck)) {
        return true
    } else {
        alert("Your input " + valToCheck + " is invalid for " + label + ". We were expected a number.")
        return false
    }
}