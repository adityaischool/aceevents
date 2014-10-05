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

	parameters1 = {
		'server_token': 'b86gyCo1Y9e5cmU40Gi9pHy5PNWmzBHMDS_TpE1W',
		'start_latitude': 37.743254,
		'start_longitude': -122.497206,
		'end_latitude': 37.771212,
		'end_longitude': -122.416767,
	}
	parameters2 = {
		'server_token': 'b86gyCo1Y9e5cmU40Gi9pHy5PNWmzBHMDS_TpE1W',
		'start_latitude': 37.743254,
		'start_longitude': -122.497206,
		'end_latitude': 37.771212,
		'end_longitude': -122.416767,
	}

	parameters3 = {
		'server_token': 'b86gyCo1Y9e5cmU40Gi9pHy5PNWmzBHMDS_TpE1W',
		'start_latitude': 37.743254,
		'start_longitude': -122.497206,
		'end_latitude': 37.771212,
		'end_longitude': -122.416767,
	}
	#37.743254,-122.497206
	data1 = urllib.urlencode(parameters1)
	data2 = urllib.urlencode(parameters2)
	data3 = urllib.urlencode(parameters3)

	url1 = url + '?' + data1
	url2 = url + '?' + data2
	url3 = url + '?' + data3

	req1 = Request(url1)
	req2 = Request(url2)
	req3 = Request(url3)

	result1 = urlopen(req1).read()
	result2 = urlopen(req2).read()
	result3 = urlopen(req3).read()

	"""r = Payload(result)
	response = requests.get(url, params=parameters)
	kittens = response.read()"""
	obj1=Payload(result1)
	obj3=Payload(result3)
	obj2=Payload(result2)

	sum1= int(obj1.prices[3]['high_estimate'])+int(obj2.prices[3]['high_estimate'])+int(obj3.prices[3]['high_estimate'])
	ave1=int(sum1/3)
	return ave1


	#data = response.json()
if __name__ == '__main__':
	getUber()