from urllib2 import Request, urlopen, URLError
import json
import pprint
import pymongo



client = pymongo.MongoClient()

db = client.evDexMaster

evDex = db.evDex

print "TESTTTTT-------------", evDex


def filterEvents(region, eventDate, eventEndTime):
	global db, client, evDex

	if region == 'sf':

		evDex = db.evDex

	elif region == 'nyc':

		evDex = db.evDexNyc

	elif region == 'denver':
		print "DENVER"
		evDex = db.evDexDenver
		

	print evDex

	print
	print "TESTING -----NEW---- FILTER EVENTS FOR", eventDate
	print

	result = {}

	eventList = []

	grids = 16

	capacityTotal = 0

	print "EVENT END TIME!", eventEndTime
	endTimeHigh = eventEndTime + .50
	endTimeLow = eventEndTime - .50

	print "endTimeHigh", endTimeHigh
	print "endTimeLow", endTimeLow

	tempEvent = {}

	#print "EVENTS FOR GRID #", i
	
	for event in evDex.find({"date": eventDate, "endTime": {'$lte': endTimeHigh, '$gte': endTimeLow}}).sort("capacity", pymongo.DESCENDING):
	#for event in evDex.find({"date": eventDate}):
		print "event found!!!!!"+str(event)
		tempEvent = {}

		tempEvent['name'] = event['name']
		tempEvent['capacity'] = event['capacity']
		tempEvent['venue'] = event['venue']
		tempEvent['lat'] = event['lat']
		tempEvent['lng'] = event['lng']
		tempEvent['date'] = event['date']
		tempEvent['endTime'] = event['endTime']

		eventList.append(tempEvent)

		#print "TEMP EVENT=", tempEvent

		#print "individual mongo events are type:", type(event)

	result[0] = [eventList]

	pprint.pprint(result)

	#resultSorted = result.sort("capacity", 1)

	#print resultSorted

	#print "RESULT: ", type(result)
	
	return result


def eventStats():

	eventCaps = {}

	for event in evDex.find():
		eventCaps[event['capacity']] = eventCaps.get(event['capacity'], 0) + 1

	print eventCaps


if __name__ == '__main__':
	eventStats()