from urllib2 import Request, urlopen, URLError
import json
import pymongo
from datetime import datetime, timedelta

#initializing connection to mongo and to specific database
client = pymongo.MongoClient()
#set the db name
db = client.Evdex
#set the collection name
ridersdb = db.drives


# def DisplayDBContents():
# for item in ridersdb.find({'driverID':"JohnD"},{"start_time":1,"end_time":1}):
# 	print item['end_time'] - item['start_time']


def GetAllRidesByDriver(driverID):
	"""
		This methid returnthe entire history for a driver from the database
	"""

	ridesList = []

	tempRide = {}
	print driverID
	for ride in ridersdb.find({'driverID':driverID}):
		print "TESTING"	
		tempRide = {}

		tempRide['start_long'] = ride['start_long']
		tempRide['start_lat'] = ride['start_lat']
		tempRide['end_long'] = ride['end_long']
		tempRide['end_lat'] = ride['end_lat']
		tempRide['start_time'] = ride['start_time']
		tempRide['end_time'] = ride['end_time']
		tempRide['start_long'] = ride['start_long']
		

		ridesList.append(tempRide)

	return ridesList

def GetAllRidesByDriverByTime(driverID,start_time,end_time):
	"""
		This method queries the database to return records filtered by driverid and time.
	"""
	starttime = datetime(start_time[0],start_time[1],start_time[2])
	endtime = datetime(end_time[0],end_time[1],end_time[2],23,59,59)
	return ridersdb.find({'driverID':driverID, 'start_time':{"$gte":starttime, "$lt":endtime}})



def GetRides(driverID,time=0,time_period=0):
	""" 
		This method is called from the views.py (route config) and in turns calls the other methods to return data from the database.
		It accepts the driverID, time_period and time as parameters.
	"""
	#temporary hard coded values
	# driverID = "JohnD@example.com"
	
	timevalues = time.split();
	time = datetime(int(timevalues[2]),int(timevalues[1]),int(timevalues[0]))
	# time = datetime(2014,11,29)
	time_period = "DAY"
	# get start and end times based on the time period value sent aas a query
	start_time, end_time = GetStartAndEndTime(time, time_period)
	#hit the db
	result = GetAllRidesByDriverByTime(driverID,start_time,end_time)
	#get only the needed data
	records = GetDriverRidesData(result)
	#get summary based onthe records data
	#summary = GetDriverSummary(records)
	return records

def GetDriverSummary():
	""" This method return a summary od the driver hidtory for a given period """
	pass

def GetDriverRidesData(results):
	""" This method return data in the form in which it is to be displayed on the dashboard.
		It accepts a dictionary which contains the dirver data as stored in the database. 
	"""
	data =[]
	for result in results:
		data.append([(result['start_long'],result['start_lat']),(result['end_long'],result['end_lat']),str(result['end_time']-result['start_time']),result['collected_fare']])
		# data.append([(result['start_long'],result['start_lat']),(result['end_long'],result['end_lat']),10,result['collected_fare']])
	return data

def InsertDriverData(record):
	""" This method can be used to enter data into the mongo db. 
		It accepts a dictionary which contains the rider data 
	"""
	ridersdb.insert({"driverID" : record['driverID'], "start_long" : record["start_long"], "start_lat" : record["start_lat"], "end_long" : record["end_long"], "end_lat" : record["end_lat"], "start_time" : record["start_time"], "end_time" : record["end_time"], "collected_fare" : record["collected_fare"], "service" : record["service"], "driveType" : record["driveType"] })


def GetStartAndEndTime(time, time_period):
	"""This method will return the start and end time based on the time and time period"""
	if time_period == "DAY":
		return  ((time - timedelta(days=1)).year,(time - timedelta(days=1)).month,(time - timedelta(days=1)).day), (time.year,time.month,time.day)

# if __name__ == "__main__":
# 	x = GetRides("JohnD@example.com", datetime(2014,11,29),"DAY")
# 	for val in x:
# 		print val
	
