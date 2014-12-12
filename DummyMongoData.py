from urllib2 import Request, urlopen, URLError
import json
import pymongo
from datetime import datetime, timedelta
from travelManager import InsertDriverData

#gets you the handler on the mongo client
client = pymongo.MongoClient()
#choose the data base
db = client.Evdex
#choose the collection
collection = db.drives

def InsertDummyRecords():
	collection.insert({"driverID" : "JohnD@example.com", "start_long" : "33.2991", "start_lat" : "-123.4122", "end_long" : "33.12988", "end_lat" : "-123.3227", "start_time" : datetime(2014,10,20,21,8,20,577), "end_time" : datetime(2014,11,20,21,42,20,577), "collected_fare" : 14, "service" : "Uber", "driveType" : "P"})
	collection.insert({"driverID" : "JohnD@example.com", "start_long" : "33.2491", "start_lat" : "123.4122", "end_long" : "33.12988", "end_lat" : "-123.3227", "start_time" : datetime(2014,11,20,21,8,20,577), "end_time" : datetime(2014,10,20,21,42,20,577), "collected_fare" : 18, "service" : "Uber", "driveType" : "P"})
	collection.insert({"driverID" : "JohnD@example.com", "start_long" : "33.42491", "start_lat" : "-123.8122", "end_long" : "33.52988", "end_lat" : "-123.5227", "start_time" : datetime(2014,11,29,21,8,20,577), "end_time" : datetime(2014,11,29,21,42,20,577), "collected_fare" : 8, "service" : "Uber", "driveType" : "P"})
	collection.insert({"driverID" : "JohnD@example.com", "start_long" : "33.52991", "start_lat" : "-123.5220", "end_long" : "33.52988", "end_lat" : "-123.5227", "start_time" : datetime(2014,11,29,21,44,20,577), "end_time" : datetime(2014,11,29,21,49,20,577), "collected_fare" : 8, "service" : "Uber", "driveType" : "E"})

if __name__ == "__main__":
	InsertDummyRecords()


