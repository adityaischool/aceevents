from urllib2 import Request, urlopen, URLError
import json

class Payload(object):
    def __init__(self, j):
        self.__dict__ = json.loads(j)

def GetEvents(x,y,rad):
	request = Request('https://www.eventbriteapi.com/v3/events/search/?token=BKKRDKVUVRC5WG4HAVLT&location.latitude='+x+'&location.longitude='+y+'&location.within='+rad+'km')
	try:
		response = urlopen(request)
		kittens = response.read()
		obj=Payload(kittens)
		#print kittens[559:1000]
	except URLError, e:
	    print 'No kittez. Got an error code:', e

	eventList = []
	capacityTotal = 0
	events={}

	for i in range(len(obj.events)):
		events['name'] = obj.events[i]['name']['html']
		events['capacity'] = obj.events[i]['capacity']
		events['venue'] = obj.events[i]['venue']['name']
		events['latitude'] = obj.events[i]['venue']['latitude']
		events['longitude'] = obj.events[i]['venue']['longitude']
		eventList.append(events)
		capacityTotal += obj.events[i]['capacity'])
	
	return (eventList,capacityTotal)