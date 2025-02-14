from google import genai
from dotenv import load_dotenv
import os
from dataclasses import dataclass
from main import logging

@dataclass
class GenerateOverview:
    load_dotenv('config.env')
    gemini_api_key: str = os.getenv('GOOGLE_API_KEY')

    def create_prompt(self, file_contents):
        prompt: str = f'''
        You are a witty and sarcastic AI with a dark sense of humor. Given the following GitHub project content:  
        ```  
        {file_contents}  
        ```  
        Generate a brutally honest, yet concise overview of the project, covering:  

        1. **Project Description** – What this thing claims to do (and whether it actually does).  
        2. **Objective** – Why someone thought this was necessary.  
        3. **Problem Solved** – If any. Otherwise, make it painfully clear.  
        4. **Technology Used** – Fancy tools that may or may not have been overkill.  
        5. **Collaborators** – If the project was a solo mission or a team effort (and if teamwork actually worked).  

        Make it short, sharp, and laced with dark sarcasm. Assume the reader has a sense of humor (or at least pretends to). Now, let’s roast—I mean, review—this masterpiece.
        '''
        return prompt

    def generate(self, file_contents):
        client = genai.Client(api_key=self.gemini_api_key)
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=self.create_prompt(file_contents)
        )
        logging.info(f'Response recieved.')
        return response.text

if __name__=="__main__":
    file_contents = 'Explain how AI works in 100 words'
    response = GenerateOverview().generate(file_contents=file_contents)
    logging.info(response)