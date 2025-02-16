from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import logging
from get_github import GetGithubInfo
from generate_overview import GenerateOverview

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency Injection for GitHub Object
def get_github_client():
    return GetGithubInfo(username='adlard07')

@app.get('/repo_info')
def get_repo_info(github_client: GetGithubInfo = Depends(get_github_client)):
    """Fetches repositories for the user."""
    try:
        repos = github_client.get_repos()
        if not repos:
            raise HTTPException(status_code=404, detail="No repositories found.")
        return repos
    except Exception as e:
        logger.error(f"Error fetching repositories: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching repositories.")

@app.get('/overview/{repo_name}')
def get_repo_overview(repo_name: str, github_client: GetGithubInfo = Depends(get_github_client)):
    """Fetches README.md content and generates an overview."""
    try:
        logger.info(f'Fetching README.md for {repo_name}')
        file_content = github_client.get_file_content(repo_name=repo_name, file_path='README.md')

        # Handle missing README.md
        if isinstance(file_content, dict) and 'message' in file_content:
            raise HTTPException(status_code=404, detail="README.md not found or not accessible.")

        # Generate overview
        response_text = GenerateOverview().generate(file_content)
        return {"overview": response_text}
    
    except HTTPException as http_err:
        raise http_err  # Preserve existing HTTP exceptions

    except Exception as e:
        logger.error(f"Error generating overview for {repo_name}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error occurred while requesting LLM.")
