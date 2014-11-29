from urllib2 import Request, urlopen, URLError
import json
import pprint
import gridCalculator
import pymongo
from eventClass import Event
from flask import session

class Payload(object):
    def __init__(self, j):
        self.__dict__ = json.loads(j)

client = pymongo.MongoClient()
db = client.evDexMaster

def loadUserNow():
	usercollection=db.users
	userEntry={'_id':session['username'],'username':session['username'],'home':''}
	user=usercollection.find_one({"_id": session['username']})
	if(user):
		pass
	else:
		usercollection.insert(userEntry)
