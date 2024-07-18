document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('toolForm');
    const result = document.getElementById('result');
    const generatedCode = document.getElementById('generatedCode');
    const downloadBtn = document.getElementById('downloadBtn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);

        fetch('/generate_tool', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            generatedCode.textContent = data.code;
            result.classList.remove('hidden');
        })
        .catch(error => console.error('Error:', error));
    });

    downloadBtn.addEventListener('click', function() {
        const code = generatedCode.textContent;
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated_tool.py';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});