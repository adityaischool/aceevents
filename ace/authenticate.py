from flask_oauth import OAuth

def auth(userid,system):
	oauth=OAuth()
	google_auth=oauth.remote_app('google',
		base_url='https://accounts.google.com/o/oauth2/auth',
		client_id='316823528009-dm3pirgbmsbivvu74omjm12mamktle46.apps.googleusercontent.com',
		#redirect_uri='/home',
		response_type='code',
		#login_hint='aitya'
			) 
	return google_auth

	"""twitter = oauth.remote_app('twitter',
		base_url='https://accounts.google.com/o/oauth2/auth',
		request_token_url='https://api.twitter.com/oauth/request_token',
		access_token_url='https://api.twitter.com/oauth/access_token',
		authorize_url='https://api.twitter.com/oauth/authenticate',
		consumer_key='<your key here>',
		consumer_secret='<your secret here>'
	) """
		
def auth2():
	oauth=OAuth()
	google = oauth.remote_app('google',
			base_url='https://www.google.com/accounts/',
			authorize_url='https://accounts.google.com/o/oauth2/auth',
			request_token_url=None,
			request_token_params={'scope': 'https://www.googleapis.com/auth/userinfo.email',
			'response_type': 'code'},
			access_token_url='https://accounts.google.com/o/oauth2/token',
			access_token_method='POST',
			access_token_params={'grant_type': 'authorization_code'},
			consumer_key='316823528009-dm3pirgbmsbivvu74omjm12mamktle46.apps.googleusercontent.com',
			consumer_secret='K_JJdUgeCJSzIvMNe8FGwKBh')
	return google


"""Client ID---
	316823528009-dm3pirgbmsbivvu74omjm12mamktle46.apps.googleusercontent.com
Email address
	316823528009-dm3pirgbmsbivvu74omjm12mamktle46@developer.gserviceaccount.com 
Client secret
	K_JJdUgeCJSzIvMNe8FGwKBh """


