import nox

@nox.session(python="3.9")
def tests(session):
    session.run("pip", "install", "-r", "requirements.txt", external=True)
    session.run("pytest", "--cov")
