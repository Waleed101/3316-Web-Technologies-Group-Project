const url = "http://localhost:8000/api/"

const hideButtons = ["hide_genreContent", "hide_trackByNameContent"]

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

// Function to search for track by matching album and track title (Implements DB.4)

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
                trackDiv.innerHTML = convertResultsToTable(["TrackID"], data, ["trackID"])
        })        
    )
}


// Helper methods

function hideButton(div) {
    document.getElementById(div).innerHTML = ""
    document.getElementById("hide_" + div).style.visibility = 'hidden'
}

function convertResultsToTable(headers, data, attr) {
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