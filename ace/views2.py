from flask import render_template,request,session,redirect,jsonify
from flask import url_for
from ace import app
import gridCalculator
import eventbrite2
import uber
import json
from ace import authenticate,userController
import urllib2

#eventbrite library called 3 times below
google=authenticate.auth2()

def auth():
	if (session['username']!=""):
		return
	else:
		return redirect(url_for('main'))

@app.route('/oauth', methods=['GET', 'POST'])
def oauth():
	#return google.authorize(callback=url_for('oauth2callback',next=request.args.get('next') or request.referrer or None))
	try:
		return google.authorize(callback='http://localhost:5000/oauth2callback')
	except Exception as e:
		print "Error @ Authorize : check callback variable"

@app.route('/oauth2callback')
#@app.route('/oauth-authorized')
@google.authorized_handler
def oauth2callback(resp):	
	print "Request="+str(request)
	print "Response="+str(resp)
	print "google="+str(google)

	next_url = request.args.get('next') or url_for('index')
	if resp is None:
		flash(u'You denied the request to sign in.')
		return redirect(next_url)

	session['google_token'] = (
		resp['access_token'],
		resp['id_token']
	)
	urlgetid='https://www.googleapis.com/plus/v1/people/me?access_token='+resp['access_token']+'&id_token='+resp['id_token']
	#ya29.wABkksuJoRL5GmqdZVixB9MMeN8lhUpvJLJmWP8Ox8mpZUJGbb9dAxYdDYp8e-6RKQE8NsWm4qmWSA
	goojson=urllib2.urlopen(urlgetid)
	#print "response=="+str(json.load(goojson))
	response=json.load(goojson)
	print "\n\n\n----response 2     "+str(response)
	session['username'] = response['emails'][0]['value']
	print "username="+session['username']
	userController.loadUserNow()
	#	flash('You were signed in as %s' % resp['screen_name'])
	return redirect(url_for('index'))

@app.route('/', methods=['GET', 'POST'])
def index():
	return render_template('index.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
	return render_template('contact.html')


@app.route('/leaflet', methods=['GET', 'POST'])
def leaflet():
	grid=gridCalculator.initMap()
	listmap=eventbrite2.GetEventsWrapper(grid)
	return render_template('leaflet.html',grid=grid,listmap=listmap)

@app.route('/_getEbData', methods=['GET', 'POST'])
def getEbData():

	"""val = eventbrite1.filterEvents("20141105", 21)
	print type(val)

	return jsonify(val)"""

	#print json.loads(request.args.get('params'))
	params = json.loads(request.args.get('params'))
	
	time = json.loads(request.args.get('time'))


	print "PARAMS-----------", params
	print "TIME-------------", time, type(time)

	eventDate = params[0][:4]+params[0][5:7]+params[0][8:10]

	print "eventDate is:", eventDate

	val = eventbrite2.filterEvents(eventDate, float(time))

	return jsonify(val)

@app.route('/_refreshEvents', methods=['POST'])
def refreshEvents():

	grids = {}

	#grid = request.form['grid'];
	day = request.form['day'];
	time = request.form['time'];
	val = eventbrite1.callDateTime(day, time)
	




	

@app.route('/_getData')
def getUber():
	#a = request.args.get('a', 0, type=int)
	val=uber.getUber()
	print "----------------------jsonify----",val
	return jsonify(result=val) 
	print "called!!!!"
	#b = request.args.get('b', 0, type=int)
		#return jsonify(result=a + b)
