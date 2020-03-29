const table = d3.select("#filtered-table")
const header = table.select("thead")
const body = table.select("tbody")

// get column headers
const headers = Object.keys(data[0])

// append column headers
headers.forEach(key => {
    header.append("th").text(key)
})

// append table rows
data.forEach(sighting => {

    const row = body.append("tr")

    headers.forEach(key => {
        row.append("td").text(sighting[key])
    })

})

