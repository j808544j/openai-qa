## Installation Instructions

- git clone https://github.com/j808544j/openai-qa
- Install dependencies by running npm install in the project directory.
- Set up your OpenAI_API credentials by creating a .env file with your API key.
- Start the server by running npm start in the project directory.

## Usage instructions:

To use this API route, you need to send a POST request to the appropriate endpoint. The endpoint will depend on how you have set up your Express server, if running locally try <PORT_NO>/qa otherwise use https://openai-qa.onrender.com/qa . You should include a JSON payload in the request body with the following format:

{
"query": "<question related to the subtitles>"
}

The "query" field should contain the question you want to ask. You can send the request using any HTTP client, such as Postman or cURL.
