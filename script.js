// Define the philosopher data
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
    var bestMatch = null;
    var bestScore = -1;

    // Iterate through philosophers and calculate scores
    for (var philosopher in philosophers) {
        var scores = philosophers[philosopher];
        var score = 0;

        // Calculate the score for this philosopher
        for (var i = 1; i <= 6; i++) {
            var answer = answers['statement' + i];
            score += Math.abs(answer - scores[i - 1]);
        }

        // Check if this philosopher is the best match
        if (bestMatch === null || score < bestScore) {
            bestMatch = philosopher;
            bestScore = score;
        }
    }

    return bestMatch;
}

// Function to display the matched philosopher on the page
function displayMatchedPhilosopher(matchedPhilosopher) {
    var resultDiv = document.getElementById('result');
    var matchedPhilosopherElement = document.getElementById('matchedPhilosopher');

    matchedPhilosopherElement.textContent = matchedPhilosopher;
    resultDiv.classList.remove('hidden');
}

// Function to calculate match and display result when the Submit button is clicked
function calculateMatchAndDisplay() {
    var formData = new FormData(document.getElementById('surveyForm'));
    var answers = {};

    for (var pair of formData.entries()) {
        var questionName = pair[0];
        var answerValue = pair[1];
        answers[questionName] = answerValue;
    }

    var matchedPhilosopher = calculateMatch(answers);
    displayMatchedPhilosopher(matchedPhilosopher);
}
