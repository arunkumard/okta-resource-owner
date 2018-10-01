require('dotenv').config()
const request = require('request-promise')
const btoa = require('btoa')
const { ISSUER, TEST_CLIENT_ID, TEST_CLIENT_SECRET, DEFAULT_SCOPE } = process.env

const test = async () => {
  const token = btoa(`0oagfwb1wrxjqFJRg0h7:mDGHrWBm-UYFz6A_UecPwLgS_KBo8TzpOLKOZQPt`)
  try {
    const { token_type, access_token } = await request({
      uri: `https://dev-867352.oktapreview.com/oauth2/v1/token`,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Basic ${token}`,
      },
      form: {
        grant_type: 'password',
		username: 'issac@company.com',
		password: 'Pass@word1',
        scope: password_scope,
      },
    })

    const response = await request({
      uri: 'http://localhost:3000',
      json: true,
      headers: {
        authorization: [token_type, access_token].join(' '),
      },
    })

    console.log(response)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

test()