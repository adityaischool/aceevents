from urllib2 import Request, urlopen, URLError
import json
import urllib

class Payload(object):
    def __init__(self, j):
        self.__dict__ = json.loads(j)

def GetEvents(x,y,rad):
	request = Request('https://www.eventbriteapi.com/v3/events/search/?token=BKKRDKVUVRC5WG4HAVLT&location.latitude='+x+'&location.longitude='+y+'&location.within='+rad+'km')
	obj1=''
	print "000000000000000000000000000000000000000",'https://www.eventbriteapi.com/v3/events/search/?token=BKKRDKVUVRC5WG4HAVLT&location.latitude='+x+'&location.longitude='+y+'&location.within='+rad+'km'
	print "JUMBA LAAAYOO", request
	try:
		response = urlopen(request)
		kittens = response.read()
		obj1=Payload(kittens)
		print "1231@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#@!#!@#@!#-                     ",obj1
		#print kittens[559:1000]
	except URLError, e:
	    print 'No kittez. Got an error code:', e

	eventList = []
	capacityTotal = 0
	events={}

def getUber():
	url = 'https://api.uber.com/v1/estimates/price'
	print "12312312312321312321"

	parameters = {
		'server_token': 'b86gyCo1Y9e5cmU40Gi9pHy5PNWmzBHMDS_TpE1W',
		'start_latitude': 37.775818,
		'start_longitude': -122.418028,
		'end_latitude': 37.771212,
		'end_longitude': -122.416767,
	}
	data = urllib.urlencode(parameters)
	url = url + '?' + data
	req = Request(url)
	result = urlopen(req).read()
	"""r = Payload(result)
	response = requests.get(url, params=parameters)
	kittens = response.read()"""
	obj1=Payload(result)
	return obj1.prices[3]['high_estimate']



	#data = response.json()
if __name__ == '__main__':
	getUber()