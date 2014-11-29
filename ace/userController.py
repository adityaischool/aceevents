from urllib2 import Request, urlopen, URLError
import json
import pprint
import gridCalculator
import pymongo
from eventClass import Event
from flask import session

class Payload(object):
    def __init__(self, j):
        self.__dict__ = json.loads(j)

today = 20141021
day = [today, today+1, today+2, today+3, today+4, today+5, today+6]
client = pymongo.MongoClient()
db = client.evDexMaster

def loadUserNow():
	usercollection=db.users
	userEntry={'_id':session['username'],'username':session['username'],'home':''}
	user=usercollection.find_one({"_id": session['username']})
	if(user):
		pass
	else:
		usercollection.insert(userEntry)

def filterEvents(eventDate, eventEndTime):
	global db, client, evDex

	print
	print "TESTING FILTER EVENTS FOR", eventDate
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
	refreshEvents(evDex)

	#filterEvents('20141031', 20.0)
	#filterEvents("20141031", 20.0)

	eventStats()