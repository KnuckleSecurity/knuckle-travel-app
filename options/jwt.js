
// JSON WEB TOKEN GENERATION OPTIONS.

const accessTokenOptions = {
    issuer: 'Knuckle Security',
    subject: 'burak@knucklesecurity.com',
    audience: 'https://www.knucklesecurity.com',
    expiresIn: "5m",
    algorithm: 'RS256'
  }
  const refreshTokenOptions = {
    issuer: 'Knuckle Security',
    subject: 'burak@knucklesecurity.com',
    audience: 'https://www.knucklesecurity.com',
    expiresIn: "1d",
    algorithm: 'RS256'
  }
  
  module.exports = {accessTokenOptions, refreshTokenOptions}
  
  
