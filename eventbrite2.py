from urllib2 import Request, urlopen, URLError
import json
import pprint
import gridCalculator
import pymongo
from eventClass import Event

class Payload(object):
    def __init__(self, j):
        self.__dict__ = json.loads(j)

today = 20141021
day = [today, today+1, today+2, today+3, today+4, today+5, today+6]
client = pymongo.MongoClient()
db = client.evDexMaster
evDex = db.evDex
#print "TESTTTTT-------------", evDex
def refreshEvents(db):
	evDex = db
	if db.evDex:
		db.evDex.remove()
	centerCoords = []
	centerCoords = gridCalculator.main()
	grids = {}
	x = '37.756603'
	y = '-122.4423225'
	rad = '6'
	noEndCount = 0
	request = Request('https://www.eventbriteapi.com/v3/events/search/?token=BKKRDKVUVRC5WG4HAVLT&location.latitude='+x+'&location.longitude='+y+'&location.within='+rad+'km')
	obj1=''
	#print "000000000000000000000000000000000000000",'https://www.eventbriteapi.com/v3/events/search/?token=BKKRDKVUVRC5WG4HAVLT&location.latitude='+x+'&location.longitude='+y+'&location.within='+rad+'km'
	#print  request
	try:
		response = urlopen(request)
		kittens = response.read()
		obj1=Payload(kittens)
		#print " ---- PAYLOAD -------------- ",str(obj1)
		#print "-------------------------OBJ LENGTH-------------------------------",len(obj1.events)
		#print kittens[559:1000]
	except URLError, e:
	    print 'No kittenz. Got an error code:', e

	eventsRaw = []
	eventList = []
	eventIDs = []
	#capacityTotal = 0
	#events={}
	pages = obj1.pagination['page_count']
	#int(pages) + 1
	for page in range(1, int(pages) + 1):
		request = Request('https://www.eventbriteapi.com/v3/events/search/?token=BKKRDKVUVRC5WG4HAVLT&location.latitude='+x+'&location.longitude='+y+'&location.within='+rad+'km&page='+str(page))
		obj1=''
		#print "000000000000000000000000000000000000000",'https://www.eventbriteapi.com/v3/events/search/?token=BKKRDKVUVRC5WG4HAVLT&location.latitude='+x+'&location.longitude='+y+'&location.within='+rad+'km&page='+str(page)
		#print  request
		try:
			response = urlopen(request)
			kittens = response.read()
			obj1=Payload(kittens)
			#print " ---- PAYLOAD -------------- ",str(obj1)
			#print "-------------------------OBJ LENGTH-------------------------------",len(obj1.events)
			#print kittens[559:1000]
		except URLError, e:
		    print 'No kittenz. Got an error code:', e

		for i in range(len(obj1.events)):
			tempTime = 0
			tempDate = 0
			date = ''
			end = 0
			name = obj1.events[i]['name']['html']
			capacity = obj1.events[i]['capacity']
			venue = obj1.events[i]['venue']['name']
			start = float(obj1.events[i]['start']['local'][11:13]) + float(obj1.events[i]['start']['local'][14:16])/60
			ebID =  obj1.events[i]['id']
			try:
				lat = obj1.events[i]['venue']['latitude']
				lng = obj1.events[i]['venue']['longitude']
			except:
				lat = obj1.events[i]['venue']['location']['latitude']
				lng = obj1.events[i]['venue']['location']['longitude']
			try:

				tempDate = obj1.events[i]['start']['local'][:4] + obj1.events[i]['start']['local'][5:7] + obj1.events[i]['start']['local'][8:10]
				print "TEMPDATE =", tempDate

				tempTime = float(obj1.events[i]['end']['local'][11:13]) + float(obj1.events[i]['end']['local'][14:16])/60
				print "TEMPTIME =", round(tempTime, 4)

				end = tempTime
				date = tempDate

			except:
				print "NO END TIME!!"
				end = 'NO END TIME!!'
				noEndCount += 1

			#event = Event(name, capacity, venue, lat, lng, date, end)

			#source, start time, price, ebID

			event = {"name": name,
						"source": 'EB',
						"ID": ebID,
						"capacity": capacity,
						"venue": venue,
						"lat": lat,
						"lng": lng,
						"date": date,
						"startTime": start,
						"endTime": end}

			if event['ID'] not in eventIDs:
				eventList.append(event)
				eventIDs.append(ebID)

	print eventIDs
	#print eventList
	print len(eventList)

	for event in eventList:
		evDex.insert(event)


	#print db.collection_names()



	#print evDex.find_one()
	#print db.collectionName.find_one()




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