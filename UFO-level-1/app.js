////      HTML ELEMENTS      ////

const table = d3.select("#filtered-table")
const filterButton = d3.select("#filter-btn")
const filterSummary = d3.select("#filter-num")
const theader = table.select("thead")
const tbody = table.select("tbody")



////     DATA PROPERTIES     ////

const fullDataLength = data.length
const headers = Object.keys(data[0])



////        FUNCTIONS        ////

// initial setup of headers
const setUpHeaders = () => {
    headers.forEach(key => {
        const th = theader.append("th")
        th.text(key)
        th.append("input")
            .classed("form-control", true)
            .attr("id", key)
            .attr("type", "text")
            .attr("placeholder", "Enter regex")
    })
}

// appending table rows per any data input
const buildTable = data => {

    tbody.html("")  // clear existing data

    data.forEach(sighting => {

        const row = tbody.append("tr")

        headers.forEach(key => {
            row.append("td").text(sighting[key])
        })

    })

    updateFilterSummary(data.length)

}

// updating filter summary
const updateFilterSummary = filteredDataLength => {
    filterSummary
        .text(`Showing ${filteredDataLength} records out of ${fullDataLength}.`)
}

// filtering and updating the table
const filterTable = () => {

    const filteredData = data.filter(sighting => {

        let match = true

        for (let i = 0; i < headers.length; i++) {

            let regExp = RegExp(
                d3.select("#" + headers[i])
                .property("value")
            )

            if (!regExp.test(sighting[headers[i]])) {
                match = false
                break
            }

        }

        return match

    })

    buildTable(filteredData)

}



////           APP           ////

setUpHeaders()
buildTable(data)
filterButton.on("click", filterTable)