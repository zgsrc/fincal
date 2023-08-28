import os
import nox

os.environ["PDM_IGNORE_SAVED_PYTHON"] = "1"


@nox.session(python="3.11.3")
def tests(session):
    session.run("pip", "install", "-r", "requirements.txt", external=True)
    session.run("pytest", "--cov")
