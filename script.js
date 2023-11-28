// Define the philosopher data
var philosophers = {
    "Kant": [3, 3, 3, 3, 1, 3],
    "Aristotle": [3, 3, 3, 4, 3, 3],
    "John Stuart Mill": [5, 2, 2, 4, 2, 4],
    "Nietzsche": [3, 2, 2, 5, 3, 3],
    "John Rawls": [3, 3, 3, 4, 2, 4],
    "Philippa Foot": [3, 3, 3, 3, 3, 3]
};

// Function to calculate the matched philosopher
function calculateMatch(answers) {
    var bestMatch = null;
    var highestScore = -1;

    // Iterate through philosophers and calculate scores
    for (var philosopher in philosophers) {
        var scores = philosophers[philosopher];
        var score = 0;

        // Calculate the score for this philosopher
        for (var i = 1; i <= 6; i++) {
            var answer = parseFloat(answers['statement' + i]);
            var correctAnswer = scores[i - 1];
            var distance = Math.abs(answer - correctAnswer);

            // Calculate partial points based on relative distance to 1 (closer is better)
            var partialPoints = 1 - distance / 4; // Assuming the scale is from 1 to 5

            // Ensure partialPoints is non-negative
            partialPoints = Math.max(0, partialPoints);

            // Add partialPoints to the score
            score += partialPoints;
        }

        // Check if this philosopher has the highest score
        if (score > highestScore) {
            bestMatch = philosopher;
            highestScore = score;
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
