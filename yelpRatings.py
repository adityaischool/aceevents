import urllib2
import json
import oauth2
import pprint
import addressToCoords

# Please assign following values with the credentials found in your Yelp account, 
# you can find them here: http://www.yelp.com/developers/manage_api_keys 
CONSUMER_KEY = 'XWZTKVrlIf0n8Gyxmgihkg'
CONSUMER_SECRET = 'wHdF8zUBnWcJ_rceQbK18ZcwSeI'
TOKEN = 'UP_PXflQ4LeMWMLKvrkxGzUxc_B_GMLI'
TOKEN_SECRET = 'p1SmFEYZbkQknMGte5yqTY2OpeQ'

# yelp_req() function description:
# The input is a url link, which you use to make request to Yelp API, and the 
# return of this function is a JSON object or error messages, including the information 
# returned from Yelp API.
# For example, when url is 'http://api.yelp.com/v2/search?term=food&location=San+Francisco'
# yelp_req(url) will return a JSON object from the Search API

urls = ["http://api.yelp.com/v2/search?term=restaurants&location=San+Francisco&cll=37.757584,-122.437595&radius_filter=6437&limit=20"]

offset = 20

for i in range(30):
    urls.append("http://api.yelp.com/v2/search?term=restaurants&location=San+Francisco&cll=37.757584,-122.437595&radius_filter=6437&limit=20&offset="+str(offset))
    offset += 20

print urls
print
print "Processing..."

hasCoord = 0
noCoord = 0
noCoordSuccess = 0

businessNames = []

def yelp_req(url):
    global hasCoord, noCoord, noCoordSuccess

    oauth_request = oauth2.Request('GET', url, {})
    oauth_request.update(
        {
            'oauth_nonce': oauth2.generate_nonce(),
            'oauth_timestamp': oauth2.generate_timestamp(),
            'oauth_token': TOKEN,
            'oauth_consumer_key': CONSUMER_KEY
        }
    )
    consumer = oauth2.Consumer(CONSUMER_KEY, CONSUMER_SECRET)
    token = oauth2.Token(TOKEN, TOKEN_SECRET)
    oauth_request.sign_request(oauth2.SignatureMethod_HMAC_SHA1(), consumer, token)
    signed_url = oauth_request.to_url()

    #print signed_url

    conn = urllib2.urlopen(signed_url, None)
    
    try:
        response = json.loads(conn.read())
    finally:
        conn.close()


    #print len(response['businesses'][0])

    bizWithCoords = []
    bizNoCoords = []

    for biz in response['businesses']:
        name = biz['name'].encode('utf-8')
        reviewCount = biz['review_count']
        address = biz['location']['display_address'][0]
        print "name:", biz['name'],
        try:

            lat = biz['location']['coordinate']['latitude']
            lng = biz['location']['coordinate']['longitude']

            print "lat:", lat
            print "long:", lng
            print
            
            businessNames.append([name, reviewCount, lat, lng])

            hasCoord += 1
        except:
            noCoord += 1
            print "address:", address
            print

            coords = addressToCoords.getCoords(address)
            
            try:
                businessNames.append([name, reviewCount, coords[0], coords[1]])
                noCoordSuccess += 1
                continue
            except:
                continue

    

        #text = unicode(biz['name'], 'utf-8')

        #businessNames.append([biz['review_count'], biz['name'].encode('utf-8')])

    

#################################################################################
# Your code goes here


if __name__ == '__main__':

    for i in range(len(urls)):
        yelp_req(urls[i])
    bizSorted = sorted(businessNames)
    pprint.pprint(bizSorted)

    """f = open('restaurants.txt', 'w')

    f.write('Yelp Top ' + str(offset) + ' Restaurants\r\n')

    for i in range(len(bizSorted)):
        #print "Length bizSorted:", len(bizSorted)
        f.write(str(i+1))
        f.write(" ")
        f.write(bizSorted[i][0].strip())
        f.write(', ')
        f.write(str(bizSorted[i][1]))
        f.write('\r\n')"""

    print "# businesses with coords= ", str(hasCoord)
    print "# businesses without coords= ", str(noCoord)
    print "noCoordSuccess= ", str(noCoordSuccess)