#!flask/bin/python
from ace import app
from ace import views2
app.config['Callback'] = 'http://localhost:5000/oauth2callback'
app.run(host='0.0.0.0', debug = True)