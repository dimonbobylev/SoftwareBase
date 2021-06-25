from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/softCD/", methods=['GET'])
def soft_cd():
    print('GET')
    return jsonify('GET')


if __name__ == '__main__':
    app.run(debug=True)
