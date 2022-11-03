const url = "http://localhost:8000/api/"

const hideButtons = ["hide_genreContent"]

function setup() {
    hideButtons.forEach(hB => {
        document.getElementById(hB).style.visibility = 'hidden'
    })
}



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

function hide(div) {
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