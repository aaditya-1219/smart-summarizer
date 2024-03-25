# Smart Summarizer Bot

## Features:

## 1. Summarize a Past URL:

Hugging Face Transformers: Use a pre-trained model like facebook/bart-large-cnn for summarization.

## 2. Summarize and Answer Questions on Uploaded PDF:

PDF Processing: Use libraries like PyPDF2 to extract text from the PDF.
Hugging Face Transformers: Apply the summarization model from feature 1 to extracted text.
Question Answering: Use a Question Answering (QA) model for answering questions based on the summary and original text.

## 3. Summarize and Answer Questions on Pasted Text:
Hugging Face Transformers: Directly use the summarization model on the pasted text.
Question Answering: Similar to feature 2, use a QA model to answer questions based on the summary.


## 4. Extract Information from Uploaded Image:
Google Lens API: Leverage Google Lens API to extract relevant information like text, objects, and scenes from the image.
Text Summarization: If the extracted information includes text, apply the summarization model for a concise overview.
Putting it all Together:

Design a user interface that allows users to choose between features and provide input (URL, PDF, Text, Image).
Develop backend code to handle user input and interact with different APIs/models.
Integrate the summarization model with the appropriate feature depending on user input (text from URL/PDF/pasted text).
For features 2 and 3, consider using a pipeline approach where summarization is done first, followed by question answering on the summary and original text.
For feature 4, combine Google Lens API results with text summarization if applicable.

![image](https://github.com/aaditya-1219/smart-summarizer/assets/120922588/e4b0b1c2-00fa-4f69-80fc-81235a06df67)


![image](https://github.com/aaditya-1219/smart-summarizer/assets/120922588/d4887e1a-08c2-40bd-9f06-a9705edd0463)

![image](https://github.com/aaditya-1219/smart-summarizer/assets/120922588/22f32f68-4979-4593-8f69-7f72ae4619d1)
![image](https://github.com/aaditya-1219/smart-summarizer/assets/120922588/84485e0e-4fb7-4917-91e1-481875e91a64)
