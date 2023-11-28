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

    // Calculate the matched philosopher based on answers
    var matchedPhilosopher = calculateMatch(answers);

    // Display the matched philosopher
    displayMatchedPhilosopher(matchedPhilosopher);
});

// Custom matching algorithm
function calculateMatch(answers) {
    // Sample matching algorithm (replace with your own logic)
    // You can use the answers object to calculate the match
    // Return the name of the matched philosopher
    // Example: Calculate match based on answers to questions 1, 2, 3, etc.
    var totalScore = 0;
    totalScore += parseInt(answers['statement1']);
    totalScore += parseInt(answers['statement2']);
    totalScore += parseInt(answers['statement3']);
    totalScore += parseInt(answers['statement4']);
    totalScore += parseInt(answers['statement5']);
    totalScore += parseInt(answers['statement6']);
    
    // Define the philosophers and their responses
    var philosophers = {
        "Plato": [3, 2, 1],
        "Aristotle": [2, 3, 1],
        "Hegel": [1, 1, 3],
        "Nietzsche": [1, 3, 3],
        "Wittgenstein": [1, 2, 3],
        "Russell": [1, 2, 2]
    };
    
    // Calculate the similarity with each philosopher
    var highestSimilarity = -1;
    var bestMatch = "Unknown";
    
    for (var philosopher in philosophers) {
        var similarity = cosineSimilarity(philosophers[philosopher], totalScore);
        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            bestMatch = philosopher;
        }
    }
    
    return bestMatch;
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vec1, vec2) {
    var dotProduct = 0;
    var normVec1 = 0;
    var normVec2 = 0;

    for (var i = 0; i < vec1.length; i++) {
        dotProduct += vec1[i] * vec2[i];
        normVec1 += vec1[i] * vec1[i];
        normVec2 += vec2[i] * vec2[i];
    }

    normVec1 = Math.sqrt(normVec1);
    normVec2 = Math.sqrt(normVec2);

    return dotProduct / (normVec1 * normVec2);
}

// Display the matched philosopher on the page
function displayMatchedPhilosopher(matchedPhilosopher) {
    var resultDiv = document.getElementById('result');
    var matchedPhilosopherElement = document.getElementById('matchedPhilosopher');

    matchedPhilosopherElement.textContent = matchedPhilosopher;
    resultDiv.classList.remove('hidden');
}
