from flask import Flask, request, jsonify, render_template
from flask_cors import CORS  # Import CORS
import os
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up Together AI with LangChain
os.environ["TOGETHER_API_KEY"] = "8c87ccad65f1801b01294e82473f6fc945326d252467d9356f3e07777c8e3322"  # Replace with your actual key

model = ChatOpenAI(
    base_url="https://api.together.xyz/v1",
    api_key=os.environ["TOGETHER_API_KEY"],
    model="mistralai/Mixtral-8x7B-Instruct-v0.1"
)

# Serve the main HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Chatbot API for responding to user input
@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    ai_response = model.invoke([HumanMessage(content=user_message)])
    return jsonify({"response": ai_response.content})

if __name__ == '__main__':
    app.run(debug=True)
