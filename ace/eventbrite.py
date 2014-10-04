from urllib2 import Request, urlopen, URLError
import json
#https://www.eventbriteapi.com/v3/events/search/?token=BKKRDKVUVRC5WG4HAVLT&location.latitude=37&location.longitude=-122&location.within=20km
request = Request('https://www.eventbriteapi.com/v3/events/search/?token=BKKRDKVUVRC5WG4HAVLT&location.latitude=37&location.longitude=-122&location.within=3km')

try:
	response = urlopen(request)
	kittens = response.read()
	#print kittens
	m=json.loads(kittens)
	
	print m
	#print kittens[559:1000]
except URLError, e:
    print 'No kittez. Got an error code:', e