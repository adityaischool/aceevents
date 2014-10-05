latstart=30
longstart=120
latincr=0.5
longincr=0.3
point=[(0,0),(0,0),(0,0),(0,0)]
grid=point*16
for i in range(16):
	rownum=i/4
	point=[[0,0],[0,0],[0,0],[0,0]]
	i2=i%4
	#for i2 in range(4):
	point[0]=[latstart+rownum*latincr,longstart+(i2)*longincr]
	point[1]=[latstart+rownum*latincr,longstart+(i2+1)*longincr]
	point[2]=[latstart+(rownum+1)*latincr,longstart+(i2)*longincr]
	point[3]=[latstart+(rownum+1)*latincr,longstart+(i2+1)*longincr]
	grid[i]=point
print grid