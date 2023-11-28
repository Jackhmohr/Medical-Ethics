// Define the philosophers data
var philosophers = {
    "Plato": [3, 2, 1, 5, 3, 1],
    "Aristotle": [2, 3, 1, 4, 6, 5],
    "Hegel": [1, 1, 3, 3, 2, 1],
    "Nietzsche": [1, 3, 3, 6, 5, 3],
    "Wittgenstein": [1, 2, 3, 3, 4, 5],
    "Russell": [1, 2, 2, 4, 3, 1]
};

// Function to calculate the matched philosopher
function calculateMatch(answers) {
    // Calculate the total score for each philosopher based on user's answers
    var scores = {};
    for (var philosopher in philosophers) {
        var responseValues = philosophers[philosopher];
        var totalScore = 0;
        for (var i = 1; i <= 6; i++) {
            var answerValue = parseInt(answers['statement' + i]);
            totalScore += Math.abs(answerValue - responseValues[i - 1]);
        }
        scores[philosopher] = totalScore;
    }

    // Find the philosopher with the minimum total score (closest match)
    var matchedPhilosopher = Object.keys(scores).reduce(function (a, b) {
        return scores[a] < scores[b] ? a : b;
    });

    return matchedPhilosopher;
}

// Function to display the matched philosopher on the page
function displayMatchedPhilosopher(matchedPhilosopher) {
    var resultDiv = document.getElementById('result');
    var matchedPhilosopherElement = document.getElementById('matchedPhilosopher');

    matchedPhilosopherElement.textContent = matchedPhilosopher;
    resultDiv.classList.remove('hidden');
}

// Function to handle form submission and calculate/display the match
function calculateMatchAndDisplay() {
    var formData = new FormData(document.getElementById('surveyForm'));
    var answers = {};
    for (var pair of formData.entries()) {
        answers[pair[0]] = pair[1];
    }
    var matchedPhilosopher = calculateMatch(answers);
    displayMatchedPhilosopher(matchedPhilosopher);
}
