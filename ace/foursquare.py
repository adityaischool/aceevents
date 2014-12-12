from foursquare import Foursquare

client = foursquare.Foursquare(client_id='HUW1WEBONO2MJBB2CL25CQSJDVVLR0DFWK2BJ2WYQ34BYGL1', client_secret='N1EMBFWHAPCHJDCFI2M2YIANUKIG0PKJP5JFT0FHTOVB3ZCO')


def checkins(client):

	client = client

	print client.checkins()

	return client.checkins()




if __name__ == '__main__':
	checkins(client)