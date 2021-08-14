"""

Create application locally, then deploy it onto a Heroku server

Heroku is a platform as a service, runs on AWS, have a free tier
Install Heroku
Sign up on Heroku

DEPLOYING TO HEROKU
-make a virtual env (should have this already to make sure your app is ready. going to gitignore all this)
-pip3 install gunicorn
    -gunicorn is a 'production ready' server
-NOTE Make sure requirements.txt is up to data
-Add a 'Procfile'
    -When we push code to Heroku we need to tell Heroku what command to run to start the server
    -NOTE THIS COMMAND MUST BE PLACED IN FILE CALLED PROCFILE
    -Make sure this filename does not have any extension and begins with a capital 'P'
    -this must be at the root of our git folder
    -'echo "web: gunicorn app:app" > Procfile'
-In command line, tell Heroku what language you are running in a runtime.txt file.
    -we are using python: so we run: 'echo "Python 3.9.5" > runtime.txt'


Creating Heroku App
-Login to Heroku on the command line
-Create an app on Heroku, will give us a new remote on Git
-Push code to the new remote and make sure you have a worker(?)
-Open Heroku app

Command Line for Above:
heroku login
heroku create NAME_OF_APP
git remote -v (make sure you see heroku)
git push heroku master (make sure you are added and committed)
heroku open

Need to set Envornmental Variables - on different server, need different environmental variable values:

heroku config:set SECRET_KEY=whatever FLASK_ENV=production
heroku config # see all of your environmental variables

ADDING A POSTGRES DB TO HEROKU APP
-heroku addons:create heroku-postgresql:hobby-dev #hobby-dev is exactly as it should be
heroku config #you should see database_url
In App
-import os
-app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgres:///flask-heroku')

CONNECT TO PSQL SHELL ON HEROKU:
heroku pg:psql

look at error logs:
heroku logs --tail
"""