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
    include_comments = data.get('includeComments', False)
    code_style = data.get('codeStyle', 'standard')

    if language == 'python':
        code = generate_python_code(tool_name, description, frameworks, input_type, output_type, additional_features, include_comments, code_style)
    elif language == 'javascript':
        code = generate_javascript_code(tool_name, description, frameworks, input_type, output_type, additional_features, include_comments, code_style)
    else:
        code = f"// Code generation for {language} is not implemented yet."

    return textwrap.dedent(code).strip()

def generate_python_code(tool_name, description, frameworks, input_type, output_type, additional_features, include_comments, code_style):
    comment = "# " if include_comments else ""
    indent = "    " if code_style != "compact" else "  "
    
    code = f"""
    {comment}{tool_name}
    {comment}{description}

    class {tool_name}:
    {indent}def __init__(self):
    {indent}{indent}self.frameworks = {frameworks}

    {indent}def process_input(self, input_data: {input_type}) -> {output_type}:
    {indent}{indent}{comment}TODO: Implement input processing logic
    {indent}{indent}pass

    {indent}def generate_output(self) -> {output_type}:
    {indent}{indent}{comment}TODO: Implement output generation logic
    {indent}{indent}pass

    {comment}Additional features:
    {chr(10).join([f"{comment}- {feature}" for feature in additional_features if feature])}

    if __name__ == "__main__":
    {indent}tool = {tool_name}()
    {indent}{comment}TODO: Add main execution logic here
    """
    
    return code if code_style != "verbose" else add_verbose_comments(code)

def generate_javascript_code(tool_name, description, frameworks, input_type, output_type, additional_features, include_comments, code_style):
    comment = "// " if include_comments else ""
    indent = "  " if code_style != "compact" else " "
    
    code = f"""
    {comment}{tool_name}
    {comment}{description}

    class {tool_name} {{
    {indent}constructor() {{
    {indent}{indent}this.frameworks = {frameworks};
    {indent}}}

    {indent}processInput(inputData) {{
    {indent}{indent}{comment}TODO: Implement input processing logic
    {indent}}}

    {indent}generateOutput() {{
    {indent}{indent}{comment}TODO: Implement output generation logic
    {indent}}}
    }}

    {comment}Additional features:
    {chr(10).join([f"{comment}- {feature}" for feature in additional_features if feature])}

    {comment}Main execution
    const tool = new {tool_name}();
    {comment}TODO: Add main execution logic here
    """
    
    return code if code_style != "verbose" else add_verbose_comments(code)

def add_verbose_comments(code):
    # Add more detailed comments for verbose mode
    verbose_comments = [
        "This class represents the main functionality of the tool.",
        "Initialize the tool with necessary frameworks and configurations.",
        "Process the input data and perform any required transformations.",
        "Generate the final output based on the processed input and tool's logic.",
        "Additional features can be implemented here to extend the tool's capabilities.",
        "Example usage of the tool in a main execution context."
    ]
    
    lines = code.split('\n')
    commented_lines = []
    comment_index = 0
    
    for line in lines:
        if line.strip().startswith('class') or line.strip().startswith('def') or line.strip().startswith('if __name__'):
            if comment_index < len(verbose_comments):
                commented_lines.append(f"# {verbose_comments[comment_index]}")
                comment_index += 1
        commented_lines.append(line)
    
    return '\n'.join(commented_lines)

@app.route('/generate_tool', methods=['POST'])
def generate_tool():
    data = request.json
    generated_code = generate_tool_code(data)
    return jsonify({"code": generated_code})

if __name__ == '__main__':
    app.run(debug=True)