import sqlite3
from flask import g
"""
def get_db():
    db = getattr(g, '/tmp/flaskr.db', None)
    if db is None:
        db = g._database = connect_to_database()
    return db

def getBuds(myname):
	db = getattr(g, '/tmp/flaskr.db', None)
	query='sele#query='select id, friendname,data from friends where id=\''+myname+'\''+'order by id desc'
	#c.execute(query)
	#results = [dict(myname=row[0], fname=row[1], srcname=row[2]) for row in c.fetchall()]
	ct id, friendname,data from friends where id=\''+myname+'\''+'order by id desc')
	cur = g.db.execute(query)
    entries = [dict(title=row[0], text=row[1]) for row in cur.fetchall()]
    return render_template('show_entries.html', entries=entries)
drop table if exists friends;
create table friends (
  id text not null,
  friendname text not null,
   data text not null
);
    """
def queryAllByUser(username):
	conn = sqlite3.connect("app/dbase/hearstdata.db")
	c = conn.cursor()
	query='select * from hearstmain where username=' + 'Amy'
	c.execute(query)
	results = [dict(username=row[0], obj=row[1]) for row in c.fetchall()]
	conn.close()
	return results
def addTable(myname):
	conn = sqlite3.connect("app/dbase/hearstdata.db")
	c = conn.cursor()
	#query='select id, friendname,data from friends where id=\''+myname+'\''+'order by id desc'
	#c.execute(query)
	#results = [dict(myname=row[0], fname=row[1], srcname=row[2]) for row in c.fetchall()]
	#conn.close()
	#return results

	querytoExec="create table hearstmain (username not null, obj not null);"
	c.execute(querytoExecs )
	conn.commit()
	conn.close()

def addMappingTable(myname):
	conn = sqlite3.connect("app/dbase/hearstdata.db")
	c = conn.cursor()
	#query='select id, friendname,data from friends where id=\''+myname+'\''+'order by id desc'
	#c.execute(query)
	#results = [dict(myname=row[0], fname=row[1], srcname=row[2]) for row in c.fetchall()]
	#conn.close()
	#return results

	querytoExec="create table usermap (uname text not null,role text not null, classname text, mappedteacher text);"
	c.execute(querytoExec)
	conn.commit()
	conn.close()

def createClassLoginTable(myname):
	conn = sqlite3.connect("app/dbase/hearstdata.db")
	c = conn.cursor()
	#query='select id, friendname,data from friends where id=\''+myname+'\''+'order by id desc'
	#c.execute(query)
	#results = [dict(myname=row[0], fname=row[1], srcname=row[2]) for row in c.fetchall()]
	#conn.close()
	#return results

	querytoExec="create table loginclass (classname text not null,role not null, login text not null, passw text, mappedteacher text);"
	c.execute(querytoExec)
	conn.commit()
	conn.close()


	#query='select id, friendname,data from friends where id=\''+myname+'\''+'order by id desc'
	#c.execute(query)
	#results = [dict(myname=row[0], fname=row[1], srcname=row[2]) for row in c.fetchall()]

def addSatchelData(username,artifact_id):
	conn = sqlite3.connect("app/dbase/hearstdata.db")
	c = conn.cursor()
	#objtoadd= [('John','Teacher','class','null'),('Amy','Student','class','John'),('Alice','Student','class','John'),('Mark','Student','class','John'), ('Ben','Student','class','John'),
	#			('Warren','Student','class','John'), ('Tim','Student','class','John'), ('Penny','Student','class','John'), ('Emily','Student','class','John'), ('Judith','Student','class','John'),
	#			('Diana','Student','class','John')]
	#entries=( teachername, studname, objid,'1','2')
	objtoadd =[(username,artifact_id)]

	query='insert into usermap values (?,?)'
	c.execute('insert into usermap values (?,?)',objtoadd)
	#results = [dict(myname=row[0], fname=row[1], srcname=row[2]) for row in c.fetchall()]
	#conn.close()
	#return results

	#querytoExec="create table hearstmain (teacher text not null,student text not null,obj1 text not null,obj2 text not null,obj3 text not null	);"
	conn.commit()
	conn.close()

def addUserData():
	conn = sqlite3.connect("ace/dbase/eventmain.db")
	c = conn.cursor()
	#hearstmain (teacher text not null,student text not null,obj1 text not null,obj2 text not null,obj3 text not null	)
	#objtoadd= [('RobinWollowski','Teacher','null','null'),('MikeAdams','Teacher','null','null'),('JimmyPage','Teacher','null','null'),('LarryKing','Teacher','null','null')]
	#objtoadd= [('Mark','Student','null','RobinWollowski'),('Viny','Student','null','RobinWollowski'), ('Anand','Student','null','JimmyPage'), ('Bruce','Student','null','RobinWollowski'), ('Andy','Student','null','RobinWollowski'), ('Bradley','Student','null','RobinWollowski'), ('Suhen','Student','null','JimmyPage'), ('Katey','Student','null','JimmyPage'), ('Ashwin','Student','null','RobinWollowski'), ('Carlos','Student','null','JimmyPage'), ('Walt','Student','null','RobinWollowski'), ('Noah','Student','null','RobinWollowski'), ('Adams','Student','null','RobinWollowski'), ('Jacques','Student','null','RobinWollowski'), ('Alex','Student','null','MikeAdams'), ('HurtingFoot','Student','null','MikeAdams'), ('Kiddy','Student','null','MikeAdams')]
	#entries=( teachername, studname, objid,'1','2')
	objtoadd= [('john','pass'),('Tim','Student')]

	query='insert into usermain values (?,?)'
	c.executemany('insert into usermain values (?,?)',objtoadd)
	#results = [dict(myname=row[0], fname=row[1], srcname=row[2]) for row in c.fetchall()]
	#conn.close()
	#return results

	#querytoExec="create table hearstmain (teacher text not null,student text not null,obj1 text not null,obj2 text not null,obj3 text not null	);"
	conn.commit()
	conn.close()

def addClassLogin():
	conn = sqlite3.connect("app/dbase/hearstdata.db")
	c = conn.cursor()
	#hearstmain (teacher text not null,student text not null,obj1 text not null,obj2 text not null,obj3 text not null	)
	#objtoadd= [('RobinWollowski','Teacher','null','null'),('MikeAdams','Teacher','null','null'),('JimmyPage','Teacher','null','null'),('LarryKing','Teacher','null','null')]
	#objtoadd= [('Mark','Student','null','RobinWollowski'),('Viny','Student','null','RobinWollowski'), ('Anand','Student','null','JimmyPage'), ('Bruce','Student','null','RobinWollowski'), ('Andy','Student','null','RobinWollowski'), ('Bradley','Student','null','RobinWollowski'), ('Suhen','Student','null','JimmyPage'), ('Katey','Student','null','JimmyPage'), ('Ashwin','Student','null','RobinWollowski'), ('Carlos','Student','null','JimmyPage'), ('Walt','Student','null','RobinWollowski'), ('Noah','Student','null','RobinWollowski'), ('Adams','Student','null','RobinWollowski'), ('Jacques','Student','null','RobinWollowski'), ('Alex','Student','null','MikeAdams'), ('HurtingFoot','Student','null','MikeAdams'), ('Kiddy','Student','null','MikeAdams')]
	#entries=( teachername, studname, objid,'1','2')
	objtoadd = [('class', 'teacher', 'teacher', 'yapikapi', 'John')]
	objtoadd = [('class', 'student', 'student','hearst','John')]
	c.executemany('insert into loginclass values (?,?,?,?,?)',objtoadd)
	#results = [dict(myname=row[0], fname=row[1], srcname=row[2]) for row in c.fetchall()]
	#conn.close()
	#return results

	#querytoExec="create table hearstmain (teacher text not null,student text not null,obj1 text not null,obj2 text not null,obj3 text not null	);"
	conn.commit()
	conn.close()



def qSatchel():
	conn = sqlite3.connect("app/dbase/hearstdata.db")
	c = conn.cursor()
	#query='select login,passw,mappedteacher from loginclass'
	query2='select mappedteacher from loginclass where login =? and passw = ?'
	c.execute(query2,('student','hearst'))
	results = [dict(login=row[0]) for row in c.fetchall()]
	print results
	conn.close()
#query='select id, friendname,data from friends where id=\''+myname+'\''+'order by id desc'
#c.execute(query)
#results = [dict(myname=row[0], fname=row[1], srcname=row[2]) for row in c.fetchall()]

def buildMainDB():
	conn = sqlite3.connect("ace/dbase/eventmain.db")
	c = conn.cursor()
	#query='select id, friendname,data from friends where id=\''+myname+'\''+'order by id desc'
	#c.execute(query)
	#results = [dict(myname=row[0], fname=row[1], srcname=row[2]) for row in c.fetchall()]
	#conn.close()
	#return results

	querytoExec="create table usermain (username not null, password not null);"
	c.execute(querytoExec)
	conn.commit()
	conn.close()


if __name__ == '__main__':
	"""addTable("")
	addMappingTable("")
	createClassLoginTable("")
	addUserData()conn.cursor()"""
	#qSatchel()
	#conn.close()
	#return results
	addUserData()
	
	#addMappingTable("not")
	"""d= getBuds('aditya')
	for e in d:
		print e['fname']"""