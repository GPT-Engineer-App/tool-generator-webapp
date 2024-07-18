from flask import Flask, request, jsonify
from flask_cors import CORS
import textwrap

app = Flask(__name__)
CORS(app)

def generate_tool_code(data):
    tool_name = data.get('toolName', 'MyTool')
    description = data.get('description', 'A custom tool')
    language = data.get('language', 'python')
    frameworks = data.get('frameworks', '').split(',')
    input_type = data.get('inputType', 'string')
    output_type = data.get('outputType', 'string')
    additional_features = data.get('additionalFeatures', '').split(',')

    if language == 'python':
        code = f"""
        # {tool_name}
        # {description}

        class {tool_name}:
            def __init__(self):
                self.frameworks = {frameworks}

            def process_input(self, input_data: {input_type}) -> {output_type}:
                # TODO: Implement input processing logic
                pass

            def generate_output(self) -> {output_type}:
                # TODO: Implement output generation logic
                pass

        # Additional features:
        {chr(10).join([f"# - {feature}" for feature in additional_features if feature])}

        if __name__ == "__main__":
            tool = {tool_name}()
            # TODO: Add main execution logic here
        """
    elif language == 'javascript':
        code = f"""
        // {tool_name}
        // {description}

        class {tool_name} {{
            constructor() {{
                this.frameworks = {frameworks};
            }}

            processInput(inputData) {{
                // TODO: Implement input processing logic
            }}

            generateOutput() {{
                // TODO: Implement output generation logic
            }}
        }}

        // Additional features:
        {chr(10).join([f"// - {feature}" for feature in additional_features if feature])}

        // Main execution
        const tool = new {tool_name}();
        // TODO: Add main execution logic here
        """
    else:
        code = f"// Code generation for {language} is not implemented yet."

    return textwrap.dedent(code).strip()

@app.route('/generate_tool', methods=['POST'])
def generate_tool():
    data = request.json
    generated_code = generate_tool_code(data)
    return jsonify({"code": generated_code})

if __name__ == '__main__':
    app.run(debug=True)