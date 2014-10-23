from urllib2 import Request, urlopen, URLError
import json
import pprint
import gridCalculator
from eventClass import Event

class Payload(object):
    def __init__(self, j):
        self.__dict__ = json.loads(j)



evDex = []

today = 20141021

day = [today, today+1, today+2, today+3, today+4, today+5, today+6]



def GetEvents():
	global evDex


	centerCoords = []
	centerCoords = gridCalculator.main()
	grids = {}

	for i in range(len(centerCoords)):
		print "CENTER COORDS", i, centerCoords[i]

	for i3 in range(3):
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
		events={}

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

			event = Event(name, capacity, venue, lat, lng, date, end)


			eventsRaw.append(event)

		"""for event in eventsRaw:
			print "event", event.name, "has a capacity of", event.capacity
			print "date is", event.date, "end time is", event.end
		print "noEndCount =", noEndCount"""


			#events['latitude'] = obj1.events[i]['venue']['latitude']
			#events['longitude'] = obj1.events[i]['venue']['longitude']


		"""for i in range(len(obj.events)):
			events['name'] = obj.events[i]['name']['html']
			events['capacity'] = obj.events[i]['capacity']
			events['venue'] = obj.events[i]['venue']['name']
			events['latitude'] = obj.events[i]['venue']['latitude']
			events['longitude'] = obj.events[i]['venue']['longitude']
			eventList.append(events)
			capacityTotal += obj1.events[i]['capacity']"""
		
		evDex.append({})

		#print evDex


		for i2 in eventsRaw:
			try:
				evDex[i3][i2.date].append(i2)
			except:
				evDex[i3][i2.date] = [i2]

	
		#print "EVDEX = ", evDex

	#sortEvents(eventList)
	#return (eventList,capacityTotal)


def sortEvents(events):
	pass


def callDateTime(grid, date, time):
	
	#print evDex[0].keys()

	counter = 0
	capacityTotal = 0

	if date in evDex[grid].keys():
		print "there is/are", len(evDex[grid][date]), "event(s) in grid", grid, "on the date", date, "!"
		for event in evDex[grid][date]:
			if (event.end >= time - .50) and (event.end <= time + .50):
				counter += 1
				capacityTotal += event.capacity
				print event.name
				print event.end
				print event.capacity
				print

		print "There are", counter, "event(s) in grid", grid, "on the date", date, "at", time, "(+/- 30 min), with total capacity of all events =", capacityTotal, "!"


def GetEventsWrapper(grid):
	listMap=[]
	for i in range(len(grid)):
		coodsx=(grid[i][0][0]+grid[i][3][0])/2
		coodsy=(grid[i][0][1]+grid[i][3][1])/2
		print "---------------------------------------------",str(coodsx),str(coodsy),str(2)
		ev=GetEvents(str(coodsx),str(coodsy),str(2))
		list1=[i,ev[1]]
		listMap.append(list1)
	return listMap


if __name__ == '__main__':
	GetEvents()
	for i in range(len(evDex)):
		print "Grid", i, ":\n\t"
		for i2 in evDex[i]:
			print i2, ": ",
			print len(evDex[i][i2])
			for i3 in evDex[i][i2]:
				print i3.end

	callDateTime(2, "20141023", 20.5)

