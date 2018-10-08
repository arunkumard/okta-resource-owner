require('dotenv').config()
const express = require('express')
const app = express()
const request = require('request-promise')
const OktaJwtVerifier = require('@okta/jwt-verifier')
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-867352.oktapreview.com/oauth2/ausgfx18siTvANpfk0h7',
})

const { ISSUER} = process.env

app.get('/secure', async (req, res) => {

	try {
    const { authorization } = req.headers
    if (!authorization) throw new Error('You must send an Authorization header')

    const [authType, token] = authorization.split(' ')
    if (authType !== 'Bearer') throw new Error('Expected a Bearer token')

    await oktaJwtVerifier.verifyAccessToken(token)

    const userinforesponse = await request({
      uri: `${ISSUER}/v1/userinfo`,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
     res.json('Hello ' + userinforesponse.name)
  
 } catch (error) {
    res.json({ error: error.message })
  }
})	

app.get('/hello', (req, res) => res.send('Hello World!'))

	  
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))

