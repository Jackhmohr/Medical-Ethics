// Define the philosopher data
var philosophers = {
    "Aristotle": [3, 3, 2, 4, 2, 3],
    "Nietzsche": [2, 3, 3, 3, 4, 2],,
    "Kant": [1, 1, 1, 5, 1, 1],
    "John Stuart Mill": [5, 4, 4, 3, 2, 4],
    "John Rawls": [3, 3, 3, 3, 2, 4],
    "Philippa Foot": [4, 2, 2, 4, 3, 3],
    "Karl Marx": [2, 4, 3, 2, 1, 2],
    "Socrates": [3, 2, 2, 4, 3, 3],
    "John Locke": [4, 3, 3, 5, 1, 2]
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
