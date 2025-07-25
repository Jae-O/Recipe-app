from flask import Flask, request, jsonify  # Flask
import recommand as rcmd

app = Flask(__name__)


@app.route('/users', methods=['GET', 'POST'])
def users():
    data = request.get_json()
    username = data['username']

    print('username: ', username)
    list = rcmd.rcmd(username)
    return jsonify(list)


if __name__ == "__main__":
    app.run(host = '192.168.25.35', port = '5000', debug=True)