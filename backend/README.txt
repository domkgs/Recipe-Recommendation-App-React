Uses Python 3.7.9

Ensure you have 'pip' installed to install python packages

To install dependencies:

Step 1: Create a virtual environment OUTSIDE of the project folder. 
In your Git Bash console, use:

python -m venv "FolderName"
For example, 

python -m venv env

(If this doesn't work, try using python3 instead and ensure Python is added to PATH)

To activate the virtual environment use:

.\env\Scripts\activate OR
source env/Scripts/activate

from the same directory you created the virtual environment in. Alternatively, you could change the path depending on whichever directory you are in.
Before running any code, ensure your virtual environment is activated.

Step 2: Installing dependencies
In the 'backend' folder, there is a 'requirements.txt' which contains a list of dependencies required to run the code.
To install this, navigate to the 'backend' folder in your console (with the virtual environment active) and run

pip install -r requirements.txt

This should read from the txt file and install each dependency through pip.

RUNNING THE BACKEND SERVER:

From the 'backend' folder, run

python -m src.server

The backend server can be accessed from 'http://127.0.0.1:8080/'.

FOLDERS:
src:
Contains main functionality to store and modify data on the backend.

routes:
Will contain flask blueprints to connect HTTP endpoints to backend functions.