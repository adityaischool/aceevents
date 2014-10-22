from urllib2 import Request, urlopen, URLError
import json
import pprint

class Payload(object):
    def __init__(self, j):
        self.__dict__ = json.loads(j)

def GetEvents(x,y,rad):
	noEndCount = 0
	request = Request('https://www.eventbriteapi.com/v3/events/search/?token=BKKRDKVUVRC5WG4HAVLT&location.latitude='+x+'&location.longitude='+y+'&location.within='+rad+'km')
	obj1=''
	print "000000000000000000000000000000000000000",'https://www.eventbriteapi.com/v3/events/search/?token=BKKRDKVUVRC5WG4HAVLT&location.latitude='+x+'&location.longitude='+y+'&location.within='+rad+'km'
	print  request
	try:
		response = urlopen(request)
		kittens = response.read()
		obj1=Payload(kittens)
		print " ---- PAYLOAD --------------                    ",str(obj1)
		print "-------------------------OBJ LENGTH-------------------------------",len(obj1.events)
		#print kittens[559:1000]
	except URLError, e:
	    print 'No kittez. Got an error code:', e

	eventList = []
	capacityTotal = 0
	events={}

	for i in range(len(obj1.events)):

		tempTime = 0
		tempDate = 0

		#pprint.pprint(obj1.events)
		#print "obj", i, "=", obj1.events[i]
		events={}
		events['name'] = obj1.events[i]['name']['html']
		events['capacity'] = obj1.events[i]['capacity']
		events['venue'] = obj1.events[i]['venue']['name']
		events['lat'] = obj1.events[i]['venue']['location']['latitude']
		events['lng'] = obj1.events[i]['venue']['location']['longitude']
		try:

			tempDate = obj1.events[i]['start']['local'][:10]
			print "TEMPDATE =", tempDate
			tempTime = obj1.events[i]['end']['local'][11:]
			events['end'] = tempTime
			events['date'] = tempDate

		except:
			print "NO END TIME!!"
			events['end'] = 'NO END TIME!!'
			noEndCount += 1
		eventList.append(events)
		capacityTotal += obj1.events[i]['capacity']

	print "noEndCount =", noEndCount


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
	
	return (eventList,capacityTotal)


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

