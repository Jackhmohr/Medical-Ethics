document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect the form data
    const formData = new FormData(event.target);
    const answers = {};

    for (const [key, value] of formData.entries()) {
        answers[key] = value;
    }

    // Send the answers to the Flask backend
    fetch('/answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
    })
    .then(response => response.json())
    .then(data => {
        // Display the matched philosopher result
        const resultDiv = document.getElementById('result');
        const matchedPhilosopher = document.getElementById('matchedPhilosopher');
        
        matchedPhilosopher.textContent = data.matched_philosopher;
        resultDiv.classList.remove('hidden');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
