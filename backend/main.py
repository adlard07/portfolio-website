from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from get_github import GetGithubInfo
from generate_overview import GenerateOverview

# Initialize logging
logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize GitHub object
github_object = GetGithubInfo(username='adlard07')

@app.get('/repo_info')
def get_repo_info():
    """Fetches repositories for the user."""
    try:
        return github_object.get_repos()
    except Exception as e:
        logging.error(f"Error fetching repositories: {str(e)}")
        return {"message": "Error fetching repositories."}

@app.get('/overview/{repo_name}')
def get_repo_overview_using_gemini(repo_name: str):
    """Fetches README.md content and generates an overview."""
    try:
        logging.info(f'Fetching README.md for {repo_name}')
        file_content = github_object.get_file_content(repo_name=repo_name, file_path='README.md')

        # Check if README.md exists
        if isinstance(file_content, dict) and 'message' in file_content:
            return {"message": "README.md not found or not accessible."}

        response_text = GenerateOverview().generate(file_content)
        return {"message": response_text}
    except Exception as e:
        logging.error(f"Error generating overview: {str(e)}")
        return {"message": "Error occurred while requesting LLM."}
