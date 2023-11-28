from flask import Flask, request, jsonify

app = Flask(__name__)

# Define philosopher responses (replace with your data)
philosophers_responses = {
    "Plato": [3,2,1],
    "Aristotle": [2,3,1],
    "Hegel":[1,1,3]
    # Add responses for other philosophers
}

# Define a function to calculate cosine similarity
import numpy as np

def cosine_similarity(vec1, vec2):
    dot_product = np.dot(vec1, vec2)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)
    similarity = dot_product / (norm_vec1 * norm_vec2)
    return similarity

# Define a function to find the best match
def find_best_match(user_responses):
    best_match = None
    highest_similarity = -1

    for philosopher, responses in philosophers_responses.items():
        similarity = cosine_similarity(user_responses, responses)
        if similarity > highest_similarity:
            highest_similarity = similarity
            best_match = philosopher

    return best_match

# Define a route to handle form submissions
@app.route('/match', methods=['POST'])
def match():
    try:
        # Get user responses from the form
        user_responses = [int(request.form[f'statement{i}']) for i in range(1, 11)]

        # Find the best matching philosopher
        matched_philosopher = find_best_match(user_responses)

        # Return the matched philosopher as JSON
        return jsonify({'matched_philosopher': matched_philosopher})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
