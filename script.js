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

    // You can replace this with code to process the form data and get the matched philosopher
    var matchedPhilosopher = calculateMatch(answers);

    // Display the matched philosopher
    displayMatchedPhilosopher(matchedPhilosopher);
});

// Replace this with your actual matching algorithm
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
    
    // You can adjust the logic here to determine the matched philosopher
    if (totalScore >= 18) {
        return "Plato";
    } else if (totalScore >= 15) {
        return "Aristotle";
    } else {
        return "Hegel";
    }
}

// Display the matched philosopher on the page
function displayMatchedPhilosopher(matchedPhilosopher) {
    var resultDiv = document.getElementById('result');
    var matchedPhilosopherElement = document.getElementById('matchedPhilosopher');

    matchedPhilosopherElement.textContent = matchedPhilosopher;
    resultDiv.classList.remove('hidden');
}
