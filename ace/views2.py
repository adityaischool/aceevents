from flask import render_template,request,session,redirect,jsonify
from flask import url_for
from ace import app
import gridCalculator
import eventbrite2
import uber
import json
from ace import authenticate,userController
import urllib2
import travelManager

google=authenticate.auth2()

def auth():
	if (session['username']!=""):
		return
	else:
		return redirect(url_for('main'))

@app.route('/default')
def default1():
	session['username']='default@default.com'
	return redirect(url_for('index'))

@app.route('/myhome')
@app.route('/oauth', methods=['GET', 'POST'])
def oauth():
	print "-------------     "+app.config['Callback']
	if ('username' in session):
		print "username exist!"
		return redirect(url_for('index'))

	#return google.authorize(callback=url_for('oauth2callback',next=request.args.get('next') or request.referrer or None))
	try:
		#return google.authorize(callback='http://localhost:5000/oauth2callback')
		print "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!          "+app.config['Callback']
		return google.authorize(callback=app.config['Callback'])
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
	doesExist=userController.loadUserNow()
	#	flash('You were signed in as %s' % resp['screen_name'])
	return redirect(url_for('index'))

@app.route('/', methods=['GET', 'POST'])
def index():
	#return render_template
	if ('username' in session):
		print "my session name = "+str(session['username'])
		return render_template('index.html')
	else:
		return redirect(url_for('land'))


@app.route('/logout', methods=['GET', 'POST'])
def logout():
	if ('username' in session):
		#session.pop('username')
		del session['username']
		print str(session)
	return render_template('homepage.html')

@app.route('/landing')
def land():
	return render_template('homepage.html')

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
	params = json.loads(request.args.get('params'))
	time = json.loads(request.args.get('time'))
	#print "PARAMS-----------", params
	#print "TIME-------------", time, type(time)
	eventDate = params[0][:4]+params[0][5:7]+params[0][8:10]
	#print "eventDate is:", eventDate
	val = eventbrite2.filterEvents(eventDate, float(time))
	return jsonify(val)

@app.route('/analytics', methods=['GET', 'POST'])
def analytics():
	#ADITYA - PLEASE CHECK THIS
	return render_template('analytics.html')

@app.route('/_getAnalytics', methods=['GET', 'POST'])
def _getAnalytics():
	driverID = json.loads(request.args.get('driverID'))
	time = json.loads(request.args.get('time'))
	timeperiod = json.loads(request.args.get('timeperiod'))
	val = travelManager.GetRides(driverid,time,timeperiod)
	return jsonify(val)

@app.route('/_writeRideData', methods=['GET', 'POST'])
def writeRideData():


	driverData = {}

	print

	print "------Completed Segment Data------"

	driverid = json.loads(request.args.get('driverid'))
	print "DRIVER ID", driverid
	driverData['driverID'] = driverid

	start_datetime = json.loads(request.args.get('start_datetime'))
	print "START DATETIME", start_datetime
	driverData['start_time'] = start_datetime

	end_datetime = json.loads(request.args.get('end_datetime'))
	print "END DATETIME", end_datetime
	driverData['end_time'] = end_datetime

	start_lat = str(request.args.get('start_lat'))
	print "START LAT", start_lat
	driverData['start_lat'] = start_lat

	start_long = str(request.args.get('start_long'))
	print "START LONG", start_long
	driverData['start_long'] = start_long

	end_lat = str(request.args.get('end_lat'))
	print "END LAT", end_lat
	driverData['end_lat'] = end_lat

	end_long = str(request.args.get('end_long'))
	print "END LONG", end_long
	driverData['end_long'] = end_long

	#one of the four cycles
	driveType = json.loads(request.args.get('driveType'))
	print "DRIVE TYPE", driveType
	driverData['driveType'] = driveType

	#if during fare cycle
	service = json.loads(request.args.get('service'))
	print "SERVICE", service
	driverData['service'] = service

	# during fare cycle
	collected_fare = str(request.args.get('collected_fare'))
	print "COLLECTED FARE", collected_fare
	driverData['collected_fare'] = collected_fare

	print

	print driverData

	#travelManager.InsertDriverData(driverData)
	

	return jsonify({"status": "received"})