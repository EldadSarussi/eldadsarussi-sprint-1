'use strict'

var gLevel = { size: 4, mines: 2, time: 10 }
var gameOn = false
var gBoard = []
var gTimer = 3
var timerId
function initGame() {
    gBoard = createBoard(gLevel)
    renderBoard()
}


function countDown(gLevel, gameTime) {
    gTimer--
    if (gTimer === 0) {
        clearInterval(timerId)
    }
    console.log(gameTime)
    var elTimeDisplay = document.getElementById('timer-display')
    elTimeDisplay.innerText = `${gameTime}`
    return gameTime
}

function createBoard() {
    var board = []
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.size; j++) {
            var cell = {
                mineAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell
        }
    }
    console.table(board)
    return board
}

function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < gLevel.size; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < gLevel.size; j++) {
            var cell = gBoard[i][j]
            strHTML += cellStrGenerator(cell, i, j)
        }
        strHTML += `</tr>\n`
    }
    var elGameContainer = document.querySelector('.grid')
    console.log(elGameContainer)
    elGameContainer.innerHTML = strHTML
    return
}

function cellStrGenerator(cell, i, j) {
    var cellStrHtml = ''
    if (cell.isMine) {
        cellStrHtml =
            `\t<td
        // title="${i}-${j}" 
        class="cell" 
        onclick="onCellClik(${i},${j})">
        <span id="${i}-${j}">
        mine
        </span>
        </td>\n`
    } else {
        var cellMinesCount = cell.mineAroundCount
        cellStrHtml =
            `\t<td 
        // title="${i}-${j}" 
        class="cell" 
        onclick="onCellClik(${i},${j})">
        <span id="${i}-${j}">
        ${cellMinesCount}
        </span>
        </td>\n`
    }
    return cellStrHtml
}

function getRandomCords() {
    var cords = []
    cords[0] = getRandomInt(0, gLevel.size)
    cords[1] = getRandomInt(0, gLevel.size)
    console.log(cords)
    return cords
}

function onCellClik(cellI, cellJ) {
    if (!gameOn) {
        var gameTime = gLevel.time
        var timerId = setInterval(countDown, 1000)
        console.log(timerId)           //<---------- תחילת סטופר 
        console.log('press', cellI, cellJ)
        gBoard[cellI][cellJ].isShown = true
        spreadMines(cellI, cellJ)
        var elCellClicked = document.getElementsByName('${cellI}-$(cellJ)')
        console.log('cellClicked:', elCellClicked)
        renderBoard(gBoard)                                        //<-------להמשיך פה!!!!
        // playGame(gBoard)
    }
    return

}

function spreadMines(cellI, cellJ) {
    console.log('firstclick:', gBoard)
    console.log('spreadmines', cellI, cellJ)
    var minesLeft = gLevel.mines
    console.log('mines-left:', minesLeft)
    while (minesLeft > 0) {
        var rowIdx = getRandomInt(0, gBoard.length)
        var colIdx = getRandomInt(0, gBoard.length)
        console.log('row:', rowIdx, 'col:', colIdx)
        console.log('gBoard-x-y:', gBoard[rowIdx][colIdx])
        if (!(gBoard[rowIdx][colIdx].isMine || gBoard[rowIdx][colIdx].isShown)) {
            gBoard[rowIdx][colIdx].isMine = true
            minesLeft = minesLeft - 1
            console.log('minesLeft:', minesLeft)
            setMinesNegsCount(rowIdx, colIdx)
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

function setMinesNegsCount(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            gBoard[i][j].mineAroundCount++
        }
    }
}

// function playGame(gBoard, level) {
//     var time=level.gameTime
//     countDown(time)
//     onCellClik()
//     var timer = setInterval(countDown, 1000)
// }



// function countDown(time) {
//     time--
//     console.log(time)
//     if (time === 0) {
//         gameOn = false
//         clearInterval(timer)
//         console.log('game-over!')
//     }
// }
