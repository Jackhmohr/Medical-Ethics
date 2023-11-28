from flask import Flask, request, jsonify

app = Flask(__name__)

# Example philosopher data (you can replace this with actual data)
philosophers = {
    'Plato': [1, 2, 3, 2, 1, 3, 2, 1, 3, 2],
    'Aristotle': [2, 3, 1, 3, 2, 1, 2, 3, 1, 2],
    # ... add other philosophers
}

def calculate_similarity(student_responses, philosopher_profile):
    score = sum(1 for a, b in zip(student_responses, philosopher_profile) if a == b)
    return score / len(student_responses)

@app.route('/match', methods=['POST'])
def match_philosopher():
    data = request.json
    student_responses = data['responses']

    matches = {}
    for name, profile in philosophers.items():
        similarity = calculate_similarity(student_responses, profile)
        matches[name] = similarity

    return jsonify(matches)

if __name__ == '__main__':
    app.run(debug=True)
