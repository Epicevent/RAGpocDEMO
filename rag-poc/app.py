from flask import Flask, request, jsonify, render_template
from your_rag_code import RAGSystem  # 실제 RAG 코드 import

app = Flask(__name__)

# RAG 시스템 초기화
rag_system = RAGSystem()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    file.save(file.filename)  # 파일 저장
    rag_system.add_document(file.filename)  # RAG 시스템에 추가
    return jsonify({"message": "Document uploaded and processed"})

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    query = data['query']
    embedding = data['embedding']
    results = rag_system.search(query, embedding)
    return jsonify(results)

@app.route('/embeddings', methods=['GET'])
def get_embeddings():
    return jsonify({"embeddings": rag_system.available_embeddings()})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
