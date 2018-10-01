const express = require('express')
const app = express()

const OktaJwtVerifier = require('@okta/jwt-verifier')
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.ISSUER,
})

app.get('/secure', async (req, res) => {

	try {
    const { authorization } = req.headers
    if (!authorization) throw new Error('You must send an Authorization header')

    const [authType, token] = authorization.split(' ')
    if (authType !== 'Bearer') throw new Error('Expected a Bearer token')

    await oktaJwtVerifier.verifyAccessToken(token)
    res.json('Hello User!')
  } catch (error) {
    res.json({ error: error.message })
  }
})	

app.get('/hello', (req, res) => res.send('Hello World!'))

	  
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))