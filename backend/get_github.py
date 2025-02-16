import requests
import base64
import logging
from utils import logging
from dataclasses import dataclass
from dotenv import load_dotenv
import os

load_dotenv('config.env')

@dataclass
class GetGithubInfo:
    username: str = 'adlard07'
    token: str = os.getenv('GITHUB_TOKEN')
    headers: dict = None

    def __post_init__(self):
        self.base_url = f"https://api.github.com/users/{self.username}/repos"
        self.headers = {
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {self.token}"
        }

    def get_repos(self):
        """Fetches all repositories for the user."""
        try:
            response = requests.get(self.base_url, headers=self.headers)
            logging.info(f'Status code: {response.status_code}')

            if response.status_code == 200:
                return response.json()
            else:
                return {'message': f'Could not fetch GitHub repos, status code: {response.status_code}'}

        except Exception as e:
            return {'Exception': str(e)}

    def get_repo_correct_name(self, repo_name):
        """Fetches the correct repository name (handling case sensitivity)."""
        repos = self.get_repos()
        if isinstance(repos, list):  # Ensure we got a list of repos
            for repo in repos:
                if repo["name"].lower() == repo_name.lower():
                    return repo["name"]  # Return correct case
        return None

    def get_file_content(self, repo_name, file_path='README.md'):
        """Fetches the content of a file from a GitHub repository."""
        correct_repo_name = self.get_repo_correct_name(repo_name)
        if not correct_repo_name:
            return {'message': f'Repository "{repo_name}" not found.'}

        # Check if file exists
        contents_url = f"https://api.github.com/repos/{self.username}/{correct_repo_name}/contents/"
        try:
            response = requests.get(contents_url, headers=self.headers)
            logging.info(f'Checking repo contents: Status code {response.status_code}')
            
            if response.status_code == 200:
                files = response.json()
                file_names = [file["name"] for file in files]

                if file_path not in file_names:
                    return {'message': f'File "{file_path}" not found in {correct_repo_name}.'}

            else:
                return {'message': f'Could not fetch repo contents, status code: {response.status_code}'}

        except Exception as e:
            return {'Exception': str(e)}

        # Fetch file
        url = f"https://api.github.com/repos/{self.username}/{correct_repo_name}/contents/{file_path}"
        try:
            response = requests.get(url, headers=self.headers)
            logging.info(f'Status code: {response.status_code}')

            if response.status_code == 200:
                file_data = response.json()
                if 'content' in file_data:
                    content = base64.b64decode(file_data['content']).decode('utf-8')
                    return content
                else:
                    return {'message': 'File content not found'}
            else:
                return {'message': f'Could not fetch file, status code: {response.status_code}'}
        except Exception as e:
            return {'Exception': str(e)}


if __name__ == "__main__":
    github = GetGithubInfo()
    repos = github.get_repos()
    # file_content = github.get_file_content(repo_name='Information-Retrieval-AI', file_path='README.md')
    print(repos)
