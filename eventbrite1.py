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

"""collectionName = 'evDex'
evDex = db.collectionName"""


evDex = db.evDex

print "TESTTTTT-------------", evDex

def refreshEvents():
	global db, client, evDex

	if db.evDex:
		db.evDex.remove()

	evDex = db.evDex

	currentGridNumber = 0

	#evDex = []
	
	centerCoords = []
	centerCoords = gridCalculator.main()
	grids = {}

	for i in range(len(centerCoords)):
		print "CENTER COORDS", i, centerCoords[i]

	for i3 in range(16):

		print
		print "Current Grid Number:", currentGridNumber

		print
		print "center lat =", centerCoords[i3][0], "center long =", centerCoords[i3][1]
		
		x = str(round(centerCoords[i3][0], 6))
		y = str(round(centerCoords[i3][1], 6))
		rad = '2'

		noEndCount = 0
		request = Request('https://www.eventbriteapi.com/v3/events/search/?token=BKKRDKVUVRC5WG4HAVLT&location.latitude='+x+'&location.longitude='+y+'&location.within='+rad+'km')
		obj1=''
		print "000000000000000000000000000000000000000",'https://www.eventbriteapi.com/v3/events/search/?token=BKKRDKVUVRC5WG4HAVLT&location.latitude='+x+'&location.longitude='+y+'&location.within='+rad+'km'
		print  request
		try:
			response = urlopen(request)
			kittens = response.read()
			obj1=Payload(kittens)
			print " ---- PAYLOAD -------------- ",str(obj1)
			print "-------------------------OBJ LENGTH-------------------------------",len(obj1.events)
			#print kittens[559:1000]
		except URLError, e:
		    print 'No kittenz. Got an error code:', e

		eventsRaw = []
		eventList = []
		#capacityTotal = 0
		#events={}

		for i in range(len(obj1.events)):

			tempTime = 0
			tempDate = 0

			#pprint.pprint(obj1.events)
			#print "obj", i, "=", obj1.events[i]
			
			"""events={}
			events['name'] = obj1.events[i]['name']['html']
			events['capacity'] = obj1.events[i]['capacity']
			events['venue'] = obj1.events[i]['venue']['name']
			events['lat'] = obj1.events[i]['venue']['location']['latitude']
			events['lng'] = obj1.events[i]['venue']['location']['longitude']
			try:

				tempDate = obj1.events[i]['start']['local'][:4] + obj1.events[i]['start']['local'][5:7] + obj1.events[i]['start']['local'][8:10]
				print "TEMPDATE =", tempDate
				tempTime = obj1.events[i]['end']['local'][11:]
				events['end'] = tempTime
				events['date'] = tempDate

			except:
				print "NO END TIME!!"
				events['end'] = 'NO END TIME!!'
				noEndCount += 1
			eventList.append(events)

			capacityTotal += obj1.events[i]['capacity']"""

			date = ''
			end = 0

			name = obj1.events[i]['name']['html']
			capacity = obj1.events[i]['capacity']
			venue = obj1.events[i]['venue']['name']
			try:
				lat = obj1.events[i]['venue']['latitude']
				lng = obj1.events[i]['venue']['longitude']
			except:
				lat = obj1.events[i]['venue']['location']['latitude']
				lng = obj1.events[i]['venue']['location']['longitude']

			try:

				tempDate = obj1.events[i]['start']['local'][:4] + obj1.events[i]['start']['local'][5:7] + obj1.events[i]['start']['local'][8:10]
				print "TEMPDATE =", tempDate

				tempTime = float(obj1.events[i]['end']['local'][11:13])+float(obj1.events[i]['end']['local'][14:16])/60
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
						"capacity": capacity,
						"venue": venue,
						"lat": lat,
						"lng": lng,
						"date": date,
						"endTime": end,
						"grid": currentGridNumber}

			post_id = evDex.insert(event)

			#post_id

			print db.collection_names()

		currentGridNumber += 1

	#print evDex.find_one()
	#print db.collectionName.find_one()




def filterEvents(eventDate, eventEndTime):
	global db, client, evDex

	print
	print "TESTING FILTER EVENTS FOR", eventDate
	print

	result = {}

	temp = {}
	eventList = []

	grids = 16

	capacityTotal = 0

	endTimeHigh = eventEndTime + .50
	endTimeLow = eventEndTime - .50

	print "endTimeHigh", endTimeHigh
	print "endTimeLow", endTimeLow

	for i in range(grids):
		temp = {} 
		capacityTotal = 0
		eventList = []

		tempEvent = {}

		print "EVENTS FOR GRID #", i
		
		for event in evDex.find({"date": eventDate, "endTime": {'$lte': endTimeHigh, '$gte': endTimeLow}, "grid": i}):
			
			capacityTotal += event['capacity']

			tempEvent = {}

			tempEvent['name'] = event['name']
			tempEvent['capacity'] = event['capacity']
			tempEvent['venue'] = event['venue']
			tempEvent['lat'] = event['lat']
			tempEvent['lng'] = event['lng']
			tempEvent['date'] = event['date']
			tempEvent['endTime'] = event['endTime']

			eventList.append(tempEvent)

			print "TEMP EVENT=", tempEvent

			print "individual mongo events are type:", type(event)

		result[i] = [eventList, capacityTotal]

		print "Capacity Total for Grid", i, "=", capacityTotal

	print "RESULT: ", type(result)
	
	return result


if __name__ == '__main__':

	refreshEvents()
	#filterEvents("20141031", 20.0)

