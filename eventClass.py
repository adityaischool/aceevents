class Event(object):

	def __init__(self, name, capacity, venue, lat, lng, date, end, price=0):

		self.name = name
		self.capacity = capacity
		self.venue	= venue
		self.lat = lat
		self.lng = lng
		self.date = date
		self.end = end
		self.price = price




if __name__ == '__main__':
	main()