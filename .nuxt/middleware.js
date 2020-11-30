const middleware = {}

middleware['authenticate'] = require('..\\middleware\\authenticate.js')
middleware['authenticate'] = middleware['authenticate'].default || middleware['authenticate']

middleware['notauthenticate'] = require('..\\middleware\\notauthenticate.js')
middleware['notauthenticate'] = middleware['notauthenticate'].default || middleware['notauthenticate']

export default middleware
