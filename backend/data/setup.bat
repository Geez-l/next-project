@REM windows
@echo off
REM create virtual environment
python -m venv venv

REM activate virtual environment
call venv\Scripts\activate

REM install dependencies from requirements.txt
pip install -r requirements.txt

echo Setup complete!
pause

@REM cmd setup.bat

@REM captures everything inside
@REM pip freeze > requirements.txt

@REM other ways
@REM pip install pipreqs
@REM creates reqs.txt
@REM pipreqs .