#bigGridCorners are SF bounding box corner coords going from top-left then clockwise
bigGridCorners = [[37.810000, -122.515500], [37.810000, -122.369145], [37.703206, -122.515500], [37.703206, -122.369145]]

smallGridLats = []
smallGridLongs = []

latIncrement = 0
longIncrement = 0

smallGridCorners = []

gridCenters = []


def main():
	global gridCenters
	#getMids(bigGridCorners)
	calcIncrements(bigGridCorners)
	calcSmallGridLatsLongs(bigGridCorners)
	calcSmallGridCorners(smallGridLats, smallGridLongs)
	for i in range(len(smallGridCorners)):
		gridCenters.append(getMids(smallGridCorners[i]))

	#print gridCenters
	return gridCenters

def getMids(corners):
	

	midLat = (corners[0][0] + corners[2][0]) / 2
	midLong = (corners[0][1] + corners[1][1]) / 2

	#print "midLat = ", str(midLat)
	#print "midLong = ", str(midLong)
	#print midLat, midLong

	return [midLat, midLong]

def calcIncrements(corners):
	global latIncrement, longIncrement

	bigGridLatDistance = (corners[1][0] - corners[2][0])
	bigGridLongDistance = (corners[0][1] - corners[1][1])

	#print "bigGridLatDistance = ", str(bigGridLatDistance)
	#print "bigGridLongDistance = ", str(bigGridLongDistance)

	latIncrement = bigGridLatDistance / 4
	longIncrement = bigGridLongDistance / 4

	#print "latIncrement = ", str(latIncrement)
	#print "longIncrement = ", str(longIncrement)

def calcSmallGridLatsLongs(corners):
	global smallGridLats, smallGridLongs

	for i in range(5):

		smallGridLats.append(bigGridCorners[0][0] - (i * latIncrement))
		smallGridLongs.append(bigGridCorners[0][1] - (i * longIncrement))

	#print "smallGridLats = ", smallGridLats
	#print "smallGridLongs = ", smallGridLongs

def calcSmallGridCorners(lats, longs):
	global smallGridCorners

	rowCounter = 0

	latStart = bigGridCorners[0][0]
	longStart = bigGridCorners[0][1]

	for i in range(16):
		row = i / 4
		points = [[0,0], [0,0], [0,0], [0,0]]

		i2 = i % 4

		points[0] = [latStart - row * latIncrement, longStart - i2 * longIncrement]
		points[1] = [latStart - row * latIncrement, longStart - (i2 + 1) * longIncrement]
		points[2] = [latStart - (row + 1) * latIncrement, longStart - i2 * longIncrement]
		points[3] = [latStart - (row + 1) * latIncrement, longStart - (i2 + 1) * longIncrement]

		smallGridCorners.append(points)

	#print "smallGridCorners = ", smallGridCorners


	
if __name__ == '__main__':
	main()