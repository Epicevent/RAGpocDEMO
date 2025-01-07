const baseUrl = "http://127.0.0.1:5000";

window.onload = async () => {
    const response = await fetch(`${baseUrl}/embeddings`);
    const data = await response.json();
    const embeddingSelect = document.getElementById('embedding');
    data.embeddings.forEach(embed => {
        const option = document.createElement('option');
        option.value = embed;
        option.textContent = embed;
        embeddingSelect.appendChild(option);
    });
};

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const response = await fetch(`${baseUrl}/upload`, {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    document.getElementById('uploadStatus').textContent = result.message;
}

async function searchQuery() {
    const query = document.getElementById('queryInput').value;
    const embedding = document.getElementById('embedding').value;

    const response = await fetch(`${baseUrl}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, embedding })
    });
    const results = await response.json();
    const resultsList = document.getElementById('results');
    resultsList.innerHTML = '';
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        resultsList.appendChild(li);
    });
}
