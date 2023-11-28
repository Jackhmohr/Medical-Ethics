document.getElementById('surveyForm').addEventListener('submit', function(event){
    event.preventDefault();
    
    // Here you can handle the form data. For example:
    var formData = new FormData(event.target);
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]); 
    }

    // You can replace this with code to process the form data
    alert('Form submitted!');
});
