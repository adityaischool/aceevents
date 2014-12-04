from urllib2 import Request, urlopen, URLError
import json
import pymongo
from datetime import datetime, timedelta

class Payload(object):
    def __init__(self, j):
        self.__dict__ = json.loads(j)

#initializing connection to mongo and to specific database
client = pymongo.MongoClient("localhost", 27017)
db = client.test
ridersdb = db.drives


# def DisplayDBContents():
# for item in ridersdb.find({'driverID':"JohnD"},{"start_time":1,"end_time":1}):
# 	print item['end_time'] - item['start_time']


def GetAllRidesByDriver(driverID):
	return ridersdb.find({'driverID':driverID})

def GetAllRidesByDriverByTime(driverID,start_time,end_time):
	# start_time = datetime(2014,9,21)
	# end_time = datetime(2014,10,21)
	starttime = datetime(start_time[0],start_time[1],start_time[2])
	endtime = datetime(end_time[0],end_time[1],end_time[2],23,59,59)
	return ridersdb.find({'driverID':driverID, 'start_time':{"$gte":starttime, "$lte":endtime}})

def GetRides(driverID,time,time_period):
	# this will come as a parameter
	# time = datetime.now()
	# get start and end times based on the time period value sent aas a query
	start_time, end_time = GetStartAndEndTime(time, time_period)
	#hit the db
	result = GetAllRidesByDriverByTime(driverID,start_time,end_time)
	#get only the needed data
	records = GetDriverRidesData(result)
	#get summary based onthe records data
	#summary = GetDriverSummary(records)
	return  records

def GetDriverSummary():
	pass

def GetDriverRidesData(results):
	data =[]
	for result in results:
		data.append([(result['start_long'],result['start_lat']),(result['end_long'],result['end_lat']),result['end_time']-result['start_time'],result['collected_fare']])
	return data

def InsertDriverData(record):
	ridersdb.insert({ "driverID" : record['driverID'], "start_long" : record["start_long"], "start_lat" : record["start_lat"], "end_long" : record["end_long"], "end_lat" : record["end_lat"], "start_time" : record["start_time"], "end_time" : record["end_time"], "collected_fare" : record["collected_fare"], "service" : record["service"], "driveType" : record["driveType"] })


def GetStartAndEndTime(time, time_period):
	# time_period = "DAY"
	if time_period == "DAY":
		return  ((time - timedelta(days=1)).year,(time - timedelta(days=1)).month,(time - timedelta(days=1)).day), (time.year,time.month,time.day)

if __name__ == "__main__":
	x = GetRides("JohnD@example.com", datetime(2014,11,29),"DAY")
	for val in x:
		print val
	# print datetime.now()
	# for item in GetAllRidesByDriverByTime("JohnD",1,2):
	# 	print item["start_time"]