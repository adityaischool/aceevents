from flask import Flask
app = Flask(__name__)
app.config.from_object('config')
print "configuring now"
print app.config['DATABASE']
#print ";;;;;;;"+app.config['Callback']
