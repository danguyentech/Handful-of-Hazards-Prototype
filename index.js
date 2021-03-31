function diceRoll() {
    let leftMargin = 16
    for (dieNumber = 1; dieNumber <= 5; dieNumber++) {
        document.getElementById(`dice${dieNumber}`).style.top = `50px`
        document.getElementById(`dice${dieNumber}`).style.left = `${leftMargin}px`
        document.getElementById(`dice${dieNumber}`).style.display = 'block'
        document.getElementById(`pair1dice${dieNumber}`).setAttribute('value', 0)
        document.getElementById(`pair2dice${dieNumber}`).setAttribute('value', 0)
        document.getElementById(`timerdice${dieNumber}`).setAttribute('value', 0)
        document.getElementById('pair1Value').innerHTML = 0
        document.getElementById('pair2Value').innerHTML = 0
        document.getElementById('timerValue').innerHTML = 0
        leftMargin = leftMargin + 100
    }
    for (dieToBeChanged = 1; dieToBeChanged <= 5; dieToBeChanged++) {
        let diceNumber = Math.floor(Math.random() * 6) + 1
        let diceChoice = (document.getElementById(`dice${dieToBeChanged}`))
        switch (diceNumber) {
            case 1:
                diceChoice.setAttribute('src', "./img/Dice One.png")
                diceChoice.setAttribute('alt', "1")
                diceChoice.setAttribute('value', "0")
                break;
            case 2:
                diceChoice.setAttribute('src', "./img/Dice Two.png")
                diceChoice.setAttribute('alt', "2")
                diceChoice.setAttribute('value', "0")
                break;
            case 3:
                diceChoice.setAttribute('src', "./img/Dice Three.png")
                diceChoice.setAttribute('alt', "3")
                diceChoice.setAttribute('value', "0")
                break;
            case 4:
                diceChoice.setAttribute('src', "./img/Dice Four.png")
                diceChoice.setAttribute('alt', "4")
                diceChoice.setAttribute('value', "0")
                break;
            case 5:
                diceChoice.setAttribute('src', "./img/Dice Five.png")
                diceChoice.setAttribute('alt', "5")
                diceChoice.setAttribute('value', "0")
                break;
            case 6:
                diceChoice.setAttribute('src', "./img/Dice Six.png")
                diceChoice.setAttribute('alt', "6")
                diceChoice.setAttribute('value', "0")
                break;
            default:
                console.log('Something has broke in diceRoll. Pls look into!')
                break;
        }
    }
    document.getElementById(`message`).innerText = 'Place the dice into the spaces!'
}

// Make the DIV element draggable:
function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let pair1Offset = document.getElementById('pair1').offsetTop
    let pair2Offset = document.getElementById('pair2').offsetTop
    let timerOffset = document.getElementById('timer').offsetTop
    if (document.getElementById(elmnt.id)) {
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        elmnt.style.transform = 'scale(1.1, 1.1)'
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        let diceLocation = (elmnt.style.top).split('p')
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        let currentLeft = elmnt.style.left.split('px')
        let currentTop = elmnt.style.top.split('px')
        let leftLimit = parseInt(document.getElementById(`scoreArea`).offsetLeft)
        let topLimit = parseInt(document.getElementById(`diceHolder`).offsetTop)
        let bottomLimit = parseInt(document.getElementById(`timer`).offsetTop)
        if (currentTop[0] < topLimit) {
            elmnt.style.top = `${topLimit}px`;
        }
        if (currentTop[0] > bottomLimit + 40) {
            elmnt.style.top = `${bottomLimit + 40}px`;
        }
        if (currentLeft[0] > leftLimit - 120) {
            elmnt.style.left = `${leftLimit - 120}px`;
        }
        if (currentLeft[0] < 0) {
            elmnt.style.left = `1px`;
        }

        if (diceLocation[0] > pair1Offset - 80 && diceLocation[0] < pair1Offset + 135) {
            document.getElementById(`pair1${elmnt.id}`).setAttribute('value', `${parseInt(elmnt.getAttribute('alt'))}`)
            document.getElementById(`pair2${elmnt.id}`).setAttribute('value', 0)
            document.getElementById(`timer${elmnt.id}`).setAttribute('value', 0)
        } else if (diceLocation[0] > pair2Offset - 80 && diceLocation[0] < pair2Offset + 135) {
            document.getElementById(`pair1${elmnt.id}`).setAttribute('value', 0)
            document.getElementById(`pair2${elmnt.id}`).setAttribute('value', `${parseInt(elmnt.getAttribute('alt'))}`)
            document.getElementById(`timer${elmnt.id}`).setAttribute('value', 0)
        } else if (diceLocation[0] > timerOffset - 80 && diceLocation[0] < timerOffset + 135) {
            document.getElementById(`pair1${elmnt.id}`).setAttribute('value', 0)
            document.getElementById(`pair2${elmnt.id}`).setAttribute('value', 0)
            document.getElementById(`timer${elmnt.id}`).setAttribute('value', `${parseInt(elmnt.getAttribute('alt'))}`)
        }
        else {
            document.getElementById(`pair1${elmnt.id}`).setAttribute('value', 0)
            document.getElementById(`pair2${elmnt.id}`).setAttribute('value', 0)
            document.getElementById(`timer${elmnt.id}`).setAttribute('value', 0)
        }
        setValue(
            parseInt(document.getElementById('pair1dice1').getAttribute('value')),
            parseInt(document.getElementById('pair1dice2').getAttribute('value')),
            parseInt(document.getElementById('pair1dice3').getAttribute('value')),
            parseInt(document.getElementById('pair1dice4').getAttribute('value')),
            parseInt(document.getElementById('pair1dice5').getAttribute('value')), `pair1Value`);
        setValue(
            parseInt(document.getElementById('pair2dice1').getAttribute('value')),
            parseInt(document.getElementById('pair2dice2').getAttribute('value')),
            parseInt(document.getElementById('pair2dice3').getAttribute('value')),
            parseInt(document.getElementById('pair2dice4').getAttribute('value')),
            parseInt(document.getElementById('pair2dice5').getAttribute('value')), `pair2Value`)
        setValue(
            parseInt(document.getElementById('timerdice1').getAttribute('value')),
            parseInt(document.getElementById('timerdice2').getAttribute('value')),
            parseInt(document.getElementById('timerdice3').getAttribute('value')),
            parseInt(document.getElementById('timerdice4').getAttribute('value')),
            parseInt(document.getElementById('timerdice5').getAttribute('value')), `timerValue`)
    }

    function closeDragElement() {
        let diceLocation = (elmnt.style.top).split('p')

        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.transform = 'scale(1, 1)'

        if (diceLocation[0] > pair1Offset - 80 && diceLocation[0] < pair1Offset + 135) {
            elmnt.style.top = `${pair1Offset + 40}px`
        } else if (diceLocation[0] > pair2Offset - 80 && diceLocation[0] < pair2Offset + 135) {
            elmnt.style.top = `${pair2Offset + 40}px`
        } else if (diceLocation[0] > timerOffset - 80 && diceLocation[0] < timerOffset + 135) {
            elmnt.style.top = `${timerOffset + 40}px`
        }
    }
}

function setValue(dice1, dice2, dice3, dice4, dice5, targetDiv) {
    let totalValue = dice1 + dice2 + dice3 + dice4 + dice5 || 0
    document.getElementById(targetDiv).innerHTML = totalValue
}

function resetPosition() {
    let leftMargin = 16
    for (dieNumber = 1; dieNumber <= 5; dieNumber++) {
        document.getElementById(`dice${dieNumber}`).style.top = `50px`
        document.getElementById(`dice${dieNumber}`).style.left = `${leftMargin}px`
        document.getElementById(`dice${dieNumber}`).style.display = 'block'
        document.getElementById(`pair1dice${dieNumber}`).setAttribute('value', 0)
        document.getElementById(`pair2dice${dieNumber}`).setAttribute('value', 0)
        document.getElementById(`timerdice${dieNumber}`).setAttribute('value', 0)
        document.getElementById('pair1Value').innerHTML = 0
        document.getElementById('pair2Value').innerHTML = 0
        document.getElementById('timerValue').innerHTML = 0
        leftMargin = leftMargin + 100
    }
}

function submitRolls() {
    let allPair1Dice = Array.from(document.getElementsByClassName('value1Dice'))
    let usedPair1Dice = (allPair1Dice.filter(checkValue))
    let allPair2Dice = Array.from(document.getElementsByClassName('value2Dice'))
    let usedPair2Dice = (allPair2Dice.filter(checkValue))
    let allTimerDice = Array.from(document.getElementsByClassName('timerDice'))
    let usedTimerDice = (allTimerDice.filter(checkValue))
    if (usedPair1Dice.length < 2 || usedPair2Dice.length < 2) {
        document.getElementById(`message`).innerText = 'Place enough dice into the pair spaces!'
    }
    else if (usedPair1Dice.length > 2 || usedPair2Dice.length > 2) {
        document.getElementById(`message`).innerText = `Only 2 dice are allowed in a pair!`
    } else if (usedTimerDice.length < 1) {
        document.getElementById(`message`).innerText = `A die must be placed into the timer slot!`
    } else if (usedTimerDice.length > 1) {
        document.getElementById(`message`).innerText = `Too much dice in the timer slot!`
    }
    else {
        let roll1 = document.getElementById(`pair1Value`).innerHTML
        let roll2 = document.getElementById(`pair2Value`).innerHTML
        let timer = document.getElementById(`timerValue`).innerHTML
        fillValueCircle(roll1)
        fillValueCircle(roll2)
        if (timer == 2 || timer == 4 || timer == 5) {
            document.getElementById('chosen').innerHTML = timer
            document.getElementById('usedSlots').innerHTML = document.getElementById(`timer${timer}CountValue`).innerHTML
            document.getElementById('usedWildSlots').innerHTML = document.getElementById(`timerWildValue`).innerHTML
            document.getElementById('confirmTimer').style.display = 'flex'
        } else {
            fillTimerCircle(timer)
        }
        //fillTimerCircle(timer)
        diceRoll()
    }
}

function hideButton() {
    document.getElementById(`startButton`).style.display = `none`
    document.getElementById(`submitButton`).style.display = `inline-block`
    document.getElementById(`resetButton`).style.display = `inline-block`
    document.getElementById(`message`).style.display = `inline-block`
}

function checkValue(die) {
    let value = die.getAttribute(`value`)
    return parseInt(value) !== 0
}

function fillValueCircle(value) {
    switch (parseInt(value)) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 10:
        case 12:
            if (parseInt(document.getElementById(`${value}CountValue`).innerHTML) < (document.getElementsByClassName(`${value}circle`).length) - 1) {
                document.getElementById(`${value}CountValue`).innerHTML = parseInt(document.getElementById(`${value}CountValue`).innerHTML) + 1
                let valueNumber = document.getElementById(`${value}CountValue`).innerHTML
                document.getElementById(`${value}CountCircle${valueNumber}`).innerHTML = `&#9679`
                console.log(`value of ${value} is: ${valueNumber}`)
                break;
            } else if (parseInt(document.getElementById(`${value}CountValue`).innerHTML) == (document.getElementsByClassName(`${value}circle`).length) - 1) {
                document.getElementById(`${value}CountValue`).innerHTML = parseInt(document.getElementById(`${value}CountValue`).innerHTML) + 1
                let valueNumber = document.getElementById(`${value}CountValue`).innerHTML
                document.getElementById(`${value}CountCircle${valueNumber}`).classList.add(`w3-green`)
                console.log(`${value} is a win!`)
                if (parseInt(document.getElementById(`2to6WinCountValue`).innerHTML) == 3 && parseInt(document.getElementById(`10to12Circle1`).innerHTML) == 1) {
                    document.getElementById('winOrLose').style.display = 'flex'
                }
                getWin(value)
                break;
            }
            else {
                if (parseInt(document.getElementById(`trashCountValue`).innerHTML) < (document.getElementsByClassName(`trashCircle`).length) - 1) {
                    document.getElementById(`trashCountValue`).innerHTML = parseInt(document.getElementById(`trashCountValue`).innerHTML) + 1
                    let trashNumber = document.getElementById(`trashCountValue`).innerHTML
                    document.getElementById(`trashCircle${trashNumber}`).innerHTML = `&#9679`
                    console.log(`value of Trash is: ${trashNumber}`)
                    break;
                } else {
                    document.getElementById(`trashCountValue`).innerHTML = parseInt(document.getElementById(`trashCountValue`).innerHTML) + 1
                    let trashNumber = document.getElementById(`trashCountValue`).innerHTML
                    document.getElementById(`trashCircle${trashNumber}`).classList.add(`w3-red`)
                    console.log(`Trash is a loss!`)
                    document.getElementById('winLossText').textContent = 'Trash overflowed! You Lose!'
                    document.getElementById('winOrLose').style.display = 'flex'
                    break;
                }
            }

        case 7:
        case 9:
            if (parseInt(document.getElementById(`${value}CountValue`).innerHTML) < (document.getElementsByClassName(`${value}circle`).length) - 1) {
                document.getElementById(`${value}CountValue`).innerHTML = parseInt(document.getElementById(`${value}CountValue`).innerHTML) + 1
                let valueNumber = document.getElementById(`${value}CountValue`).innerHTML
                document.getElementById(`${value}CountCircle${valueNumber}`).innerHTML = `&#9679`
                console.log(`value of ${value} is: ${valueNumber}`)
                break;
            }
                else{
                    document.getElementById(`${value}CountValue`).innerHTML = parseInt(document.getElementById(`${value}CountValue`).innerHTML) + 1
                    let valueNumber = document.getElementById(`${value}CountValue`).innerHTML
                    document.getElementById(`${value}CountCircle${valueNumber}`).classList.add(`w3-red`)
                    console.log(`${value} is a loss!`)
                    document.getElementById('winLossText').textContent = `${value} overflowed! You Lose!`
                    document.getElementById('winOrLose').style.display = 'flex'
                    break;
                }
        case 8:
        case 11:
            if (parseInt(document.getElementById(`trashCountValue`).innerHTML) < (document.getElementsByClassName(`trashCircle`).length) - 1) {
                document.getElementById(`trashCountValue`).innerHTML = parseInt(document.getElementById(`trashCountValue`).innerHTML) + 1
                let trashNumber = document.getElementById(`trashCountValue`).innerHTML
                document.getElementById(`trashCircle${trashNumber}`).innerHTML = `&#9679`
                console.log(`value of Trash is: ${trashNumber}`)
                break;
            } else {
                document.getElementById(`trashCountValue`).innerHTML = parseInt(document.getElementById(`trashCountValue`).innerHTML) + 1
                let trashNumber = document.getElementById(`trashCountValue`).innerHTML
                document.getElementById(`trashCircle${trashNumber}`).classList.add(`w3-red`)
                console.log(`Trash is a loss!`)
                document.getElementById('winLossText').textContent = 'Trash overflowed! You Lose!'
                document.getElementById('winOrLose').style.display = 'flex'
                break;
            }
        default:
            console.log(`Something broke in fillValueCircle: pls fix!`)
            break;
    }
}

function fillTimerCircle(value) {
    switch (parseInt(value)) {
        case 2:
        case 4:
        case 5:
            if (parseInt(document.getElementById(`timer${value}CountValue`).innerHTML) < (document.getElementsByClassName(`timer${value}Circle`).length) - 1) {
                document.getElementById(`timer${value}CountValue`).innerHTML = parseInt(document.getElementById(`timer${value}CountValue`).innerHTML) + 1
                let timerNumber = document.getElementById(`timer${value}CountValue`).innerHTML
                document.getElementById(`timer${value}CountCircle${timerNumber}`).innerHTML = `&#9679`
                console.log(`value of Timer ${value} is: ${timerNumber}`)
                break;
            } else {
                document.getElementById(`timer${value}CountValue`).innerHTML = parseInt(document.getElementById(`timer${value}CountValue`).innerHTML) + 1
                let timerNumber = document.getElementById(`timer${value}CountValue`).innerHTML
                document.getElementById(`timer${value}CountCircle${timerNumber}`).classList.add(`w3-red`)
                console.log(`Timer is a loss!`)
                document.getElementById('winLossText').textContent = `Timer ${value}You Lose!`
                document.getElementById('winOrLose').style.display = 'flex'
                break;
            }
        case 1:
        case 3:
        case 6:
            if (parseInt(document.getElementById(`timerWildValue`).innerHTML) < (document.getElementsByClassName(`wildcircle`).length) - 1) {
                document.getElementById(`timerWildValue`).innerHTML = parseInt(document.getElementById(`timerWildValue`).innerHTML) + 1
                let wildNumber = document.getElementById(`timerWildValue`).innerHTML
                document.getElementById(`timerWildCircle${wildNumber}`).innerHTML = `&#9679`
                console.log(`value of Wild is: ${wildNumber}`)
                break;
            } else {
                document.getElementById(`timerWildValue`).innerHTML = parseInt(document.getElementById(`timerWildValue`).innerHTML) + 1
                let wildNumber = document.getElementById(`timerWildValue`).innerHTML
                document.getElementById(`timerWildCircle${wildNumber}`).classList.add(`w3-red`)
                console.log(`Wild is a loss!`)
                document.getElementById('winLossText').textContent = 'Wild Timer overflowed! You Lose!'
                document.getElementById('winOrLose').style.display = 'flex'
                break;
            }
        default:
            console.log(`Something broke in fillTimerCircle: pls fix!`)
            break;
    }
}

function getWin(value) {
    switch (parseInt(value)) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            if (parseInt(document.getElementById(`2to6WinCountValue`).innerHTML) < (document.getElementsByClassName(`2to6circle`).length) - 1) {
                document.getElementById(`2to6WinCountValue`).innerHTML = parseInt(document.getElementById(`2to6WinCountValue`).innerHTML) + 1
                let twoTo6WinNumber = document.getElementById(`2to6WinCountValue`).innerHTML
                document.getElementById(`2to6Circle${twoTo6WinNumber}`).classList.add(`w3-green`)
            }
            break;
        case 10:
        case 12:
            document.getElementById(`10to12Circle1`).classList.add(`w3-green`)
            break;
        default:
            console.log(`Something broke in getWin. Pls fix!`)
            break;
    }
}