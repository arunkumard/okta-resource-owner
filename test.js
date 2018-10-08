require('dotenv').config()
const request = require('request-promise')
const btoa = require('btoa')
const { ISSUER, TEST_CLIENT_ID, TEST_CLIENT_SECRET, DEFAULT_SCOPE } = process.env

const test = async () => {
  const token = btoa(`${TEST_CLIENT_ID}:${TEST_CLIENT_SECRET}`)
  try {
    const { token_type, access_token,id_token } = await request({
      uri: `${ISSUER}/v1/token`,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Basic ${token}`,
      },
      form: {
        grant_type: 'password',
		    username: 'rchinta@mailinator.com',
		    password: 'Pass@word1',
        scope: DEFAULT_SCOPE
      },
    })
    console.log(" Start Access Token ")
    console.log(" ___________________")
    console.log(access_token)
    console.log(" ___________________")
    console.log(" End Access Token ")
   

    console.log(" Start Get UserInfo " )
    console.log(" ___________________")
    const userinforesponse = await request({
      uri: `${ISSUER}/v1/userinfo`,
      json: true,
      method: 'POST',
      headers: {
        authorization: [token_type, access_token].join(' '),
      },
    })
    console.log(userinforesponse)
    console.log(" ___________________")
    console.log(" End Get UserInfo " )

    console.log(" Start Secure Info " )

    const response = await request({
      uri: 'http://localhost:3000/secure',
      json: true,
      headers: {
        authorization: [token_type, access_token].join(' '),
        'id_token': id_token,
      },
    })

    console.log(response)

    console.log(" End Secure Info " )

  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

test()