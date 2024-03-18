from flask import Flask, request, jsonify
from flask_cors import CORS
from goose3 import Goose
from transformers import pipeline 
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from transformers import AutoModelForQuestionAnswering, AutoTokenizer

load_dotenv()
os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = Flask(__name__)
CORS(app)

#decorator
@app.route('/summarizeUrl', methods=['POST'])
def summarize_text():
    data = request.get_json()
    urlReceived = data['url']

    # Logic starts here 
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    goose = Goose()
    # article = goose.extract(url='https://www.nationalgeographic.com/environment/article/global-warming-effects')
    article = goose.extract(url=urlReceived)
    input_text = article.cleaned_text 
    summary = summarizer(input_text, max_length=300, min_length=300, do_sample=False)
    # print(summary[0]['summary_text'])
    goose.close()
    # pdf_docs =  get_pdf_text('file')
    text_chunks = get_text_chunks(input_text)

    # Debug information
    # print("Length of text_chunks:", len(text_chunks))
    # print("Contents of text_chunks:", text_chunks)

    get_vector_store(text_chunks)
    # return jsonify({'message': 'Processing completed'})
    return jsonify({'summary': summary[0]['summary_text']}) 


def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

# def get_vector_store(text_chunks):
#     embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
#     vector_store = FAISS.from_texts(text_chunks, embedding=embeddings,allow_dangerous_deserialization=True)
#     vector_store.save_local("faiss_index")

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)  # Remove the insecure setting
    # vector_store = FAISS.from_texts(text_chunks, embedding=embeddings,allow_dangerous_deserialization=True)  # Remove the insecure setting
    vector_store.save_local("faiss_index")



def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
    provided context just say, "answer is not available in the context", don't provide the wrong answer\n\n
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

def user_input(user_question):
    # Load GoogleGenerativeAIEmbeddings
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    new_db = FAISS.load_local("faiss_index", embeddings,allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(user_question)
    chain = get_conversational_chain()
    response = chain.invoke({"input_documents": docs, "question": user_question}, return_only_outputs=True)
    print(response)
    return response["output_text"]


@app.route('/process', methods=['POST'])
def process_pdf():
    print("Hello from process_pdf")
    try:
        pdf_docs = request.files.getlist('file')
        # pdf_docs =  get_pdf_text('file')
        raw_text = get_pdf_text(pdf_docs)
        text_chunks = get_text_chunks(raw_text)

        # Debug information
        print("Length of text_chunks:", len(text_chunks))
        print("Contents of text_chunks:", text_chunks)

        get_vector_store(text_chunks)
        return jsonify({'message': 'Processing completed'})
    except Exception as e:
        print(f"Error in process_pdf: {e}")
        return jsonify({'error': 'Internal Server Error'})

@app.route('/chat', methods=['POST'])
def chat_with_pdf():
    try:
        user_question = request.json['message']
        print("User Question---->",user_question)
        response = user_input(user_question)
        
        print("thesen is-->",response)
        return jsonify({'response': response})
    except Exception as e:
        print(f"Error in chat_with_pdf: {e}")
        return jsonify({'error': 'Internal Server Error'})


if __name__ == '__main__':
    app.run(debug=True)