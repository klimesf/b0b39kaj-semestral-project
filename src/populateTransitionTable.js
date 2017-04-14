export default function(transitionTable, symbols) {
    let states = []
    let transitionTableHeadRowEl = document.querySelector(".transition-table > thead > tr")
    transitionTableHeadRowEl.innerHTML = ""
    for (var state in transitionTable) {
        if (!transitionTable.hasOwnProperty(state)) {
            continue;
        }
        states.push(state)
    }

    // Top left corner of table
    let headerCol = document.createElement("th")
    headerCol.textContent = "-"
    transitionTableHeadRowEl.appendChild(headerCol)

    // For each symbol, add header column
    symbols.forEach((symbol) => {
        let headerCol = document.createElement("th")
        headerCol.textContent = symbol
        transitionTableHeadRowEl.appendChild(headerCol)
    })

    let transitionTableBodyEl = document.querySelector(".transition-table > tbody")
    transitionTableBodyEl.innerHTML = ""
    for (var state in transitionTable) {
        if (!transitionTable.hasOwnProperty(state)) {
            continue;
        }
        let stateRow = document.createElement("tr")

        // Create row header - name of the state
        let rowHeader = document.createElement("th")
        rowHeader.innerHTML = `q<sub>${state}</sub>`
        stateRow.appendChild(rowHeader)

        symbols.forEach((symbol) => {
            let col = document.createElement("td")
            if (transitionTable[state].hasOwnProperty(symbol)) {
                let step = transitionTable[state][symbol]
                let nextState = step.nextState < states.length ? step.nextState : "F"
                col.innerHTML = `q<sub>${nextState}</sub>`
                + `<span>|</span>${step.rewrite}`
                + `<span>|</span>${step.direction}`
            }
            col.dataset.state = state
            col.dataset.symbol = symbol
            col.classList.add("transition")
            stateRow.appendChild(col)
        })

        // Append the row
        transitionTableBodyEl.appendChild(stateRow)
    }
}
