
const $form = $('#guess-form')
const $msgToUser = $('#msg-out')
const $submitGuess = $('#submit-guess')
const $guess = $('#guess')
const $highestScore = $('#hi-score')
const $timesPlayed = $('#times-played')
const $score = $('#score')
const $timer = $('#timer')

function outputMsg(resultMsg, guess) {
    wordCheckResult = resultMsg['result']
    if (wordCheckResult === 'ok') {
        return `Nice! ${guess} is a word!`
    }
    else if (wordCheckResult === 'not-on-board') {
        return `${guess} is a word but it's not on the board!`
    }
    else if (wordCheckResult === 'repeat') {
        return `You've already guessed ${guess}`
    }
    else {
        return `${guess} is not a word, try again!`
    }
}

function outputScore(resultMsg) {
    score = resultMsg['score']
    $score.text(`Score: ${score}`)
}

async function checkGuessWithServer(evt) {
    evt.preventDefault()
    const guess = $guess.val()
    const res = await axios.get(`http://127.0.0.1:5000/guess/${guess}`)
    
    $guess.val('')
    $msgToUser.text(outputMsg(res.data, guess))
    outputScore(res.data)
    
    return console.log(countDown())
}

enterGuess = $form.on('click', 'button', checkGuessWithServer)

async function sendDataToServerUpdateFE() {
    const res = await axios.get('http://127.0.0.1:5000/update-data')
    hiScore = res.data['hi_score']
    timesPlayed = res.data['times_played']
    $highestScore.text(`Highest Score: ${hiScore}`)
    $timesPlayed.text(`Times Played: ${timesPlayed}`)

    return console.log(res.data)
}

function countDown() {
    currentTimeLine = $timer.text()
    currentTime = parseInt(currentTimeLine.match(/(\d+)/)[0], 10)
    if (currentTime > 0) {
        currentTime--
    }
    else {
        clearInterval(timer)
        enterGuess.off()
        $submitGuess.prop('disabled', true)
        sendDataToServerUpdateFE()
    }
    $timer.text(`Time: ${currentTime} seconds`)
}

timer = setInterval(countDown, 1000)



