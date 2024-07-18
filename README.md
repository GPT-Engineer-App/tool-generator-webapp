# tool-generator-webapp

I need a tool generator web application that can create code templates for various types of tools based on user input. The application should have a form where users can input details such as the tool name, description, primary programming language, frameworks, input type, output type, and additional features. The tool should then generate a basic code template in the specified programming language with placeholders for the provided details.

The application should be built using Flask for the backend and a simple HTML/CSS/JavaScript frontend. Here are the requirements:

1. Create a directory structure with an `app.py` file, a `templates` folder containing an `index.html` file, a `static` folder containing `css` and `js` folders for styles and scripts respectively, and a `requirements.txt` file.

2. The `app.py` file should set up a Flask server with two routes:
   - `/` for rendering the main HTML page.
   - `/generate_tool` for handling POST requests with tool details and returning the generated code.

3. The `index.html` file should have a form with fields for the tool name, description, primary programming language, frameworks, input type, output type, and additional features. Each field should have a tooltip providing additional information. The form should have a submit button that triggers a JavaScript function to send the form data to the `/generate_tool` endpoint and display the generated code.

4. The `styles.css` file should style the form and the page layout to make it user-friendly and visually appealing. The layout should be clear and the elements should be easy to interact with.

5. The `scripts.js` file should handle the form submission, send the data to the backend, and display the generated code on the page. It should also include a function to download the generated code as a text file.

6. The `requirements.txt` file should include Flask as a dependency.

Ensure the generated tool code is well-formatted and includes placeholders for user-provided details. The generated code should be returned as a JSON response and displayed in a preformatted text block on the frontend. Additionally, provide a download option for the generated code.

Please implement this application following best practices for clean and maintainable code.


## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/tool-generator-webapp.git
cd tool-generator-webapp
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
