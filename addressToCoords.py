import pprint
import json
import urllib




def getCoords(address):


	addressElements = str(address).split()
	addressFormatted = '+'.join(addressElements)
	addressCity = addressFormatted + '+san+francisco+ca'
	print addressCity
	results = json.load(urllib.urlopen("https://www.kimonolabs.com/api/3do9clk8?apikey=ohaaKLHfgvUUvuDUg62CBBXTH4gWkUmF&address="+addressCity))


	#pprint.pprint(results)

	try:
		print "Lat=", results['results']['collection1'][1]['geocode']['text'][:10].encode('utf-8')
		print "Long=", results['results']['collection1'][2]['geocode']['text'][:10].encode('utf-8')
		print

		lat = results['results']['collection1'][1]['geocode']['text'][:10]
		lng = results['results']['collection1'][2]['geocode']['text'][:10]
		
		return [lat, lng]
	except:
		return None

if __name__ == '__main__':
	getCoords('1477 van ness ave')