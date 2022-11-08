const url = "/api/"

document.getElementById('initialTab').click()

const NO_RESULTS_MESSAGE = (query, table) => "Your query " + query + " to the " + table + " records returned no results"

const cleanUserInput = (input) => input.replace(/<\/?[^>]+(>|$)/g, "")

const ERROR_MESSAGE_DIVS = ["genreContent", "trackByNameContent", "artistByNameContent", "albumByTitleContent", "listContent", "createListResult", "searchListResult", "deleteListResult", "updateListResult"]

function clearErrorMessages() {
    hide()
    ERROR_MESSAGE_DIVS.forEach(error => {
        document.getElementById(error).innerHTML = ""
    })
}

function openTab(evt, tab) {
    var i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
}

// Method to get all genres (Implements DB.1)

function getAllGenres() {
    clearErrorMessages()
    console.log("Get Genres")

    fetch(url + "genre")
        .then(res => res.json()
            .then(data => {
                console.log("Got Genres...")
                
                convertResultsToTable(["ID", "Name", "Parent ID"], data, ["id", "title", "parent"], "result")
        })        
    )
}

// Method to get all lists (Implements DB.10)

function getAllLists() {
    clearErrorMessages()
    console.log("Get Lists")

    fetch(url + "list")
        .then(res => res.json()
            .then(data => {
                console.log("Got Lists...")
                data.forEach(indiv => {
                    indiv["totalPlayTime"] = Math.floor(parseInt(indiv["totalPlayTime"])/60) + ":" + (parseInt(indiv["totalPlayTime"]) % 60)
                })
                convertResultsToTable(["Name", "Total Playtime", "Number of Tracks"], data, ["name", "totalPlayTime", "numberOfTracks"], "result")
        })        
    )
}

// Function to search for track by matching album and track title (Implements DB.4 & FE.1a)

function getTracksByNameContent() {
    clearErrorMessages()
    const input = document.getElementById("trackOrAlbumName").value

    console.log("Searching for tracks or tracks in albums with the following name/pattern: " + input)

    let listDiv = document.getElementById("trackByNameContent")

    fetch(url + "track?title=" + input)
        .then(res => res.json()
            .then(data => {
                console.log("Got Tracks...")

                if (data.message) {
                    listDiv.innerHTML = "<p class='result error'>" + data.message + "</p>"
                    return
                }

                if(data.length == 0) {
                    listDiv.innerHTML = "<p class='result error'>No results matching the track or album name '" + input + "'</p>"
                    return
                }

                trackInfo = []

                console.log(data)
                
                data.forEach(track => {
                    console.log(track["trackID"])
                    trackInfo.push(getBasicTrackInfoByID(track["trackID"]))
                })

                Promise.all(trackInfo).then((vals) => {
                    convertResultsToTable(["Title", "Album", "Artist", "Playtime"], vals, ["title", "album", "artist", "playTime"], "result")   
                })
        })        
    )
}

// Function to search for artists by their name (Implements FE.1b)

function getArtistsByName() {
    clearErrorMessages()
    const input = document.getElementById("artistName").value

    console.log("Searching for artists following name/pattern: " + input)

    let listDiv = document.getElementById("artistByNameContent")
    
    fetch(url + "artist?name=" + input)
        .then(res => res.json()
            .then(data => {
                console.log("Got Artists...")                

                if (data.message) {
                    listDiv.innerHTML = "<p class='result error'>" + data.message + "</p>"
                    return
                }

                if(data.length == 0) {
                    listDiv.innerHTML = "<p class='result error'>No results matching the artist name '" + input + "'</p>"
                    return
                }
                
                artistResult = []

                data.forEach(artist => {
                    artistResult.push(getBasicArtistInfoById(artist["artistID"]))
                })

                Promise.all(artistResult).then((vals) => {
                    convertResultsToTable(["Name", "Year Start", "Year End", "Contact", "Location", "Tags"], vals, ["name", "yearStart", "yearEnd", "contact", "location", "tags"], "result")   
                })
        })        
    )
}

// Function to search for albums by their name (Implements FE.1c)

function getAlbumsByTitle() {
    clearErrorMessages()
    const input = document.getElementById("albumTitle").value

    console.log("Searching for albums following title/pattern: " + input)

    let listDiv = document.getElementById("albumByTitleContent")

    fetch(url + "album?title=" + input)
        .then(res => res.json()
            .then(data => {
                console.log("Got Albums...")

                if (data.message) {
                    listDiv.innerHTML = "<p class='result error'>" + data.message + "</p>"
                    return
                }

                if(data.length == 0) {
                    listDiv.innerHTML = "<p class='result error'>No results matching the album name '" + input + "'</p>"
                    return
                }                
                
                convertResultsToTable(["Album ID", "Title", "Artist Name", "Released", "Uploaded", "Track Count"], data, 
                                                            ["id", "title", "artistName", "dateReleased", "dateUploaded", "tracks"], "result")
        })        
    )
}

// Function to Delete a List (Implements DB.9)

function deleteList() {
    clearErrorMessages()
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
    clearErrorMessages()
    const input = document.getElementById("searchListName").value

    console.log("Retrieving list with name: " + input)

    let listDiv = document.getElementById("searchListResult")

    if(input.length < 3 || input.length > 255) {
        listDiv.innerHTML = "<p class='result error'>Your input is not between the length of 3 and 255</p>"
        return
    }

    fetch(url + "list/?name=" + input)
        .then(res => res.json()
            .then(data => {
                console.log(data)
                if(data.message) {
                    listDiv.innerHTML = "<p class='result error'>" + data.message + "</p>"
                    return
                }
                if(data.length == 0) {
                    listDiv.innerHTML = "<p class='result error'>No results matching the list name '" + input + "'</p>"
                    return
                }
                
                tracks = data[0]['tracks'].split(",")

                if(tracks == '[]') {
                    listDiv.innerHTML = "<p class='result error'>No tracks associated with list name '" + input + "'</p>"
                    return
                }

                trackInfo = []
                
                tracks.forEach(track => {
                    trackInfo.push(getBasicTrackInfoByID(track))
                })

                Promise.all(trackInfo).then((vals) => {
                    convertResultsToTable(["Title", "Album", "Artist", "Playtime"], vals, ["title", "album", "artist", "playTime"], "result")   
                })
            })        
    )
}

const getBasicTrackInfoByID = async (track_id) => {
    
    let res = await fetch(url + "track/" + track_id)

    let data = await res.json()

    console.log(data)

    let info = {
        "artist": data["artist"][0]["name"],
        "title": data["title"],
        "album": data["album"][0]["title"],
        "playTime": data["duration"]
    }

    return info
}

const getBasicArtistInfoById = async (artist_id) => {
    
    let res = await fetch(url + "artist/" + artist_id)

    let data = await res.json()

    let info = {
        "name": data["name"],
        "yearStart": data["yearStart"],
        "yearEnd": data["yearEnd"],
        "contact": data["contact"],
        "location": data["location"],
        "tags": data["tags"]
    }

    return info
}

// Function to Create a List (Implements FE.2a & DB.6)

function createList() {
    clearErrorMessages()

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
    clearErrorMessages()

    const name = document.getElementById("updateList_name").value
    const tracks = document.getElementById("updateList_tracks").value

    console.log("Updating list with name: " + name + " to have " + tracks + " tracks.")

    const result = document.getElementById("updateListResult")

    if(name.length < 3 || name.length > 255) {
        result.innerHTML = "<p class='result error'>Your input is not between the length of 3 and 255</p>"
        return
    }

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

function hide() {
    document.getElementById("output").innerHTML = ""
}

function convertResultsToTable(headers, data, attr, tP) {

    let tableParent = document.getElementById("output")
    console.log(data)  

    let info = ""

    if(data.length == 0) {
        return "No results found."
    }

    info += "<tr>"
    headers.forEach(h => {info += ("<th><button class='sorting' onclick='sortBy(this)'>" + h + "</button></th>")})
    info += "</tr>"

    console.log(info)

    data.forEach(val => {
        console.log(val)
        info += "<tr>"
        attr.forEach(col => {
            val[col] = val[col] == undefined ? "" : val[col]
            info += ("<td>" + cleanUserInput(val[col].toString()) + "</td>")
        })
        info += "</tr>"
    })

    console.log(info)

    tableParent.innerHTML = info
    // return result
}

const getValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent

const comparator = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getValue(asc ? a : b, idx), getValue(asc ? b : a, idx))


function sortBy(button) {
    const th = button.closest('th')
    const table = th.closest('table')
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparator(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) )
};

function isNumber(valToCheck, label) {
    if(/^\d+$/.test(valToCheck)) {
        return true
    } else {
        alert("Your input " + valToCheck + " is invalid for " + label + ". We were expected a number.")
        return false
    }
}