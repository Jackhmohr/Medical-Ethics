// Add an event listener to the form submission
document.getElementById('surveyForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Here you can handle the form data. For example:
    var formData = new FormData(event.target);
    var answers = {};

    for (var pair of formData.entries()) {
        // Use the name attribute to distinguish between questions
        var questionName = pair[0];
        var answerValue = pair[1];

        // Store answers in an object using question names as keys
        answers[questionName] = answerValue;
    }

    // Calculate the matched philosopher
    var matchedPhilosopher = calculateMatch(answers);

    // Display the matched philosopher
    displayMatchedPhilosopher(matchedPhilosopher);
});

// Define the function to calculate the matched philosopher
function calculateMatch(answers) {
    // Extract response values as integers
    var responseValues = [];
    for (var i = 1; i <= 6; i++) {  // Adjust the loop for the number of statements
        var questionName = 'statement' + i;
        var answerValue = parseInt(answers[questionName]);
        responseValues.push(answerValue);
    }

    // Define the philosophers and their responses
    var philosophers = {
        "Plato": [3, 2, 1,5,3,1],
        "Aristotle": [2, 3, 1,4,6,5],
        "Hegel": [1, 1, 3,3,2,1],
        "Nietzsche": [1, 3, 3,6,5,3],
        "Wittgenstein": [1, 2, 3,3,4,5],
        "Russell": [1, 2, 2,4,3,1]
    };

    // Calculate similarity scores for each philosopher
    var similarityScores = {};
    for (var philosopher in philosophers) {
        var philosopherResponses = philosophers[philosopher];
        var score = 0;
        for (var i = 0; i < responseValues.length; i++) {
            score += responseValues[i] * philosopherResponses[i];
        }
        similarityScores[philosopher] = score;
    }

    // Find the philosopher with the highest similarity score
    var matchedPhilosopher = Object.keys(similarityScores).reduce(function (a, b) {
        return similarityScores[a] > similarityScores[b] ? a : b;
    });

    return matchedPhilosopher;
}

// Display the matched philosopher on the page
function displayMatchedPhilosopher(matchedPhilosopher) {
    var resultDiv = document.getElementById('result');
    var matchedPhilosopherElement = document.getElementById('matchedPhilosopher');

    matchedPhilosopherElement.textContent = matchedPhilosopher;
    resultDiv.classList.remove('hidden');
}
