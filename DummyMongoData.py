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
	collection.insert({"driverID" : "JohnD@example.com", "start_long" : "33.42491", "start_lat" : "-123.8122", "end_long" : "33.52988", "end_lat" : "-123.5227", "start_time" : datetime(2014,11,29,21,8,20,577), "end_time" : datetime(2014,11,29,21,42,20,577), "collected_fare" : 4, "service" : "Uber", "driveType" : "P"})
	collection.insert({"driverID" : "JohnD@example.com", "start_long" : "33.52991", "start_lat" : "-123.5220", "end_long" : "33.52988", "end_lat" : "-123.5227", "start_time" : datetime(2014,11,29,21,44,20,577), "end_time" : datetime(2014,11,29,21,49,20,577), "collected_fare" : 10, "service" : "Uber", "driveType" : "E"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.52991", "start_lat" : "-122.55550", "end_long" : "33.52988", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,12,21,44,20,577), "end_time" : datetime(2014,12,12,21,49,20,577), "collected_fare" : 8, "service" : "Uber", "driveType" : "E"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.12994", "start_lat" : "-123.55550", "end_long" : "33.13988", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,13,20,41,20,577), "end_time" : datetime(2014,12,13,20,49,20,577), "collected_fare" : 9, "service" : "Uber", "driveType" : "W"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "32.52991", "start_lat" : "-122.55550", "end_long" : "33.55988", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,13,22,04,20,577), "end_time" : datetime(2014,12,13,22,12,20,577), "collected_fare" : 5, "service" : "Uber", "driveType" : "P"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.52491", "start_lat" : "-124.53450", "end_long" : "33.54988", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,13,22,24,20,577), "end_time" : datetime(2014,12,13,22,40,20,577), "collected_fare" : 12, "service" : "Uber", "driveType" : "P"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.51922", "start_lat" : "-123.52555", "end_long" : "32.52988", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,19,9,44,20,577), "end_time" : datetime(2014,12,19,9,49,20,577), "collected_fare" : 5, "service" : "Uber", "driveType" : "P"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.12445", "start_lat" : "-123.52553", "end_long" : "32.53488", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,19,9,52,20,577), "end_time" : datetime(2014,12,19,9,54,20,577), "collected_fare" : 5, "service" : "Uber", "driveType" : "E"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.54753", "start_lat" : "-123.52676", "end_long" : "33.35688", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,19,9,59,20,577), "end_time" : datetime(2014,12,19,10,03,20,577), "collected_fare" : 6, "service" : "Uber", "driveType" : "P"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.54616", "start_lat" : "-123.44220", "end_long" : "33.56688", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,19,11,10,20,577), "end_time" : datetime(2014,12,19,11,19,20,577), "collected_fare" : 10, "service" : "Uber", "driveType" : "P"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.64545", "start_lat" : "-123.56720", "end_long" : "33.11388", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,19,11,30,20,577), "end_time" : datetime(2014,12,19,11,40,20,577), "collected_fare" : 6, "service" : "Uber", "driveType" : "W"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.46545", "start_lat" : "-123.52220", "end_long" : "33.56488", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,19,11,41,20,577), "end_time" : datetime(2014,12,19,12,9,20,577), "collected_fare" : 17, "service" : "Uber", "driveType" : "P"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.45455", "start_lat" : "-123.22435", "end_long" : "33.56688", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,19,12,32,20,577), "end_time" : datetime(2014,12,19,12,49,20,577), "collected_fare" : 11, "service" : "Uber", "driveType" : "E"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.65544", "start_lat" : "-123.22220", "end_long" : "33.22188", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,19,14,44,20,577), "end_time" : datetime(2014,12,19,15,00,20,577), "collected_fare" : 8, "service" : "Uber", "driveType" : "P"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.44555", "start_lat" : "-123.11220", "end_long" : "33.37488", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,19,15,14,20,577), "end_time" : datetime(2014,12,19,15,29,20,577), "collected_fare" : 9, "service" : "Uber", "driveType" : "W"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.89511", "start_lat" : "-123.11220", "end_long" : "33.52988", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,19,15,44,20,577), "end_time" : datetime(2014,12,19,16,49,20,577), "collected_fare" : 48, "service" : "Uber", "driveType" : "P"})
	collection.insert({"driverID" : "default@default.com", "start_long" : "33.65581", "start_lat" : "-123.63220", "end_long" : "33.52988", "end_lat" : "-123.5227", "start_time" : datetime(2014,12,19,17,44,20,577), "end_time" : datetime(2014,12,19,17,49,20,577), "collected_fare" : 8, "service" : "Uber", "driveType" : "P"})
if __name__ == "__main__":
	InsertDummyRecords()


