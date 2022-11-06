const url = "/api/"

const hideButtons = ["hide_genreContent", "hide_trackByNameContent", "hide_artistByNameContent", 
                     "hide_albumByTitleContent", "hide_artistByIDContent", "hide_trackByIDContent",
                     "hide_listContent"]

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

// Method to get all lists (Implements DB.10)

function getAllLists() {
    console.log("Get Lists")
    
    let genreDiv = document.getElementById("listContent")

    fetch(url + "list")
        .then(res => res.json()
            .then(data => {
                console.log("Got Lists...")
                
                document.getElementById("hide_listContent").style.visibility = 'visible'
                genreDiv.innerHTML = convertResultsToTable(["Name", "Total Playtime", "Number of Tracks"], data, ["name", "totalPlayTime", "numberOfTracks"])
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

// Function to Delete a List (Implements DB.9)

function deleteList() {
    const input = document.getElementById("deleteListName").value

    console.log("Deleting list with name: " + input)

    const result = document.getElementById("deleteListResult")

    fetch(url + "list/", {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": input })
    })
        .then(res => res.json()
            .then(res => {
                if(res.message) {
                    result.innerHTML = "<p class='result error'>" + res.message + "</p>"
                } else {
                    result.innerHTML = "<p class='result success'>Successfully deleted list with name '" + input + "'</p>"
                }
            })
        )
}

// Function to get all tracks on a specific list (Implements DB.2)

function searchListName() {
    const input = document.getElementById("searchListName").value

    console.log("Retrieving list with name: " + input)
    
    let listDiv = document.getElementById("searchListResult")

    fetch(url + "list/?name=" + input)
        .then(res => res.json()
            .then(data => {
                if(data.message) {
                    listDiv.innerHTML = "<p class='result error'>" + data.message + "</p>"
                    return
                }
                if(data.length == 0) {
                    listDiv.innerHTML = "<p class='result error'>No results matching the list name '" + input + "'</p>"
                    return
                }

                console.log("Got List.")
                console.log(data)
                listDiv.innerHTML = "List of name " + input + " has tracks " + data[0]['tracks']                
            })        
    )
}

// Function to Create a List (Implements FE.2a & DB.6)

function createList() {
    const input = document.getElementById("createListName").value

    console.log("Creating list with name: " + input)

    const result = document.getElementById("createListResult")

    fetch(url + "list/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": input, "tracks": "[]", "totalPlayTime": "0" })
    })
        .then(res => res.json()
            .then(res => {
                if(res.message) {
                    result.innerHTML = "<p class='result error'>" + res.message + "</p>"
                } else {
                    result.innerHTML = "<p class='result success'>Successfully created list with name '" + input + "'</p>"
                }
            })
        )
}

// Function to Update a List (Implements FE.2a & DB.7)

function updateList() {
    const name = document.getElementById("updateList_name").value
    const tracks = document.getElementById("updateList_tracks").value

    console.log("Updating list with name: " + name + " to have " + tracks + " tracks.")

    const result = document.getElementById("updateListResult")

    fetch(url + "list/" + name, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": name, "tracks": tracks })
    })
        .then(res => res.json()
            .then(res => {
                if(res.message) {
                    result.innerHTML = "<p class='result error'>" + res.message + "</p>"
                } else {
                    result.innerHTML = "<p class='result success'>Successfully updated list with name '" + name + "'</p>"
                }
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