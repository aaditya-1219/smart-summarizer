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
import serpapi
import cloudinary
import cloudinary.uploader
import cloudinary.api
from cloudinary.uploader import upload
from collections import Counter
from PIL import Image


config = cloudinary.config(secure=True)
cloudinary.config(
    cloud_name="dqzgegyxz",
    api_key="588341419325431",
    api_secret="ETi9nfOxk8rfEkxHveWgzbyLfJg"
)
load_dotenv()
params = {
    "engine": "google_lens",
    "url": "",
    # "url": "https://res.cloudinary.com/dqzgegyxz/image/upload/v1711176880/iexxvto99aobdddd4tco.jpg",
    "api_key": "0e6cd3cc461a2819f178f186423bf0949afc0d1ef7f80d5325434bf8ab105ee8"
}
imageInfo = ""
# search = serpapi.search(params)
# print(search)
os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = Flask(__name__)
CORS(app)


def get_gemini_response(jsonInfo):
    prompt = str(jsonInfo)
    input_prompt = f"""
    
            {prompt}

            You are provided with the JSON information generated from the google lens -->  and  i want information about it to give the information
            do not give the JSON response only give response as per below template output i want 

            "title --> 
            desription -->
            related image -->
            product average price if (applicable) -->
            main Source link -->
            video Link if available -->
            summary of the Data -->"
            
            give the output
            
"""
    # print(input_prompt)
    # input_prompt = """
    
    # you have given the JSON data filter out the useful data form it and give me in the template form like
    # "title --> 
    # desription -->
    # related image -->
    # product average price if (applicable) -->
    # main Source link -->
    # video Link if available -->
    # summary of the Data -->"
    
    # """

    print(input_prompt)
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content([input_prompt])
    # print(response)
    return response.text


def extract_subjects(visual_matches):
    subjects = []
    for match in visual_matches:
        title = match.get('title', '')
        subjects.append(title)  # Add all titles to list of potential subjects
    return subjects

@app.route('/imgQuery', methods=['POST'])
def img_query():
    if(params['url']==''):
        return jsonify({'response': "Please upload an image first"}), 200
    data = request.get_json()
    userQuery = data['query']
    imageData = serpapi.search(params)
    # print(imageData)
    input_prompt = f"""
    
            {imageData}
            Based on this JSON data, answer the given query:
            {userQuery}

            give the output
            
"""
    print(input_prompt)
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content([input_prompt])
    print(response.text)
    # return response.text
    return jsonify({'response': response.text}), 200


@app.route('/uploadImg', methods=['POST'])
def img_upload():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'Empty file provided'}), 400
    try:
        result = upload(file)
        image_url = result['secure_url']
        print(image_url)
        params['url'] = image_url
        # imageInfo = serpapi.search(params)
        
        # Get response from Gemini
        # response = get_gemini_response(imageInfo)
        # response = response.replace('*','')
        # print(response)
        # Extract subjects from visual matches
        # visual_matches = search.get("visual_matches", [])
        # subjects = extract_subjects(visual_matches)
        # response = get_gemini_response(subjects)
        # print(response)

        # Return the most likely subject
        return jsonify({'response': 'Image uploaded'}), 200
        # return jsonify({'response': response}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# decorator


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
    summary = summarizer(input_text, max_length=300,
                         min_length=300, do_sample=False)
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
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

# def get_vector_store(text_chunks):
#     embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
#     vector_store = FAISS.from_texts(text_chunks, embedding=embeddings,allow_dangerous_deserialization=True)
#     vector_store.save_local("faiss_index")


def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    # Remove the insecure setting
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
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
    prompt = PromptTemplate(template=prompt_template,
                            input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain


def user_input(user_question):
    # Load GoogleGenerativeAIEmbeddings
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    new_db = FAISS.load_local(
        "faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(user_question)
    chain = get_conversational_chain()
    response = chain.invoke(
        {"input_documents": docs, "question": user_question}, return_only_outputs=True)
    print(response)
    return response["output_text"]


@app.route('/processText', methods=['POST'])
def process_text():
    data = request.get_json()
    usertext = data['text']
    text_chunks = get_text_chunks(usertext)
    get_vector_store(text_chunks)
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    summary = summarizer(usertext, max_length=300,
                         min_length=300, do_sample=False)
    return jsonify({'summary': summary[0]['summary_text']})


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
        print("User Question---->", user_question)
        response = user_input(user_question)

        print("thesen is-->", response)
        return jsonify({'response': response})
    except Exception as e:
        print(f"Error in chat_with_pdf: {e}")
        return jsonify({'error': 'Internal Server Error'})


if __name__ == '__main__':
    app.run(debug=True)
