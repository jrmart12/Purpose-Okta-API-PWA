import axios from 'axios'

// Parse credentials
const parseCredentials = (credentials, loginService, verifyEmail, isSnakeCase, mfaFactors) => {
  if (isSnakeCase) {
    credentials.stateToken
    credentials.authenticationState = credentials.status
    credentials.email
    credentials.userId
    credentials.password
  }

  const creds = {
    stateToken: credentials.accessToken,
    authenticationState: credentials.authenticationState,
    email: credentials.email,
    userId: credentials.userId,
    loginService: loginService,
    verifyEmail: verifyEmail,
    mfaFactors: mfaFactors
  }
  return creds
}

function login(email, password) {
  const body = JSON.stringify({
    username: email,
    password: password,
    options: {
      multiOptionalFactorEnroll: true,
      warnBeforePasswordExpired: true
    }
  })

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (email && password) {
    return new Promise(function (resolve, reject) {
      axios
        .post('http://localhost:1337/auth/primary', body, config)
        .then((result) => {
          const data = result.data
          const loginService = 'oktaAuthAPI'
          if (data.stateToken) {
            const temp = []
            data.mfaFactors.map((factor) => {
              console.log(factor)
              temp.push({
                factorId: factor.id, //at this stage, only those factors are shown which were previoulsy enrolled in MFA list
                factorType: factor.factorType,
                vendorName: factor.vendorName
              })
            })
            resolve(parseCredentials(result, loginService, true))
          } else {
            resolve(parseCredentials(result, loginService, false))
          }
        })
        .catch((err) => {
          reject(err.message)
        })
    })
  }
}

export { login }
