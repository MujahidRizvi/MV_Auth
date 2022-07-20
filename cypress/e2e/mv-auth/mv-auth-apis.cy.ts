//import xyz;

describe('Signup New User api', () => {
  context('POST /signUp', () => {

    //Positive TestCases
    
    it('user inputs valid parameters', () => {
      cy.request({ method: 'POST', url: 'https://staging-gateway.wrld.xyz/auth/signUp?csrf-bypass=true', body: { providerKey: "0x6ebb625b6dc64614d87fa978e6fa7756843775b9", providerType: "wallet" }, failOnStatusCode: false }).then(
        (response) => {
          expect(response.body.data).to.have.keys('userId', 'providerId', 'userScreenName', 'email', 'nonce')
          expect(response.body.data.userId).equals(67)
          expect(response.status).to.eq(200)
          expect(response.body.data).to.have.property('userId')
        })
    })

    //Negative TestCases

    it('user only inputs the providerKey and misses providerType param', () => {
      cy.request({ method: 'POST', url: 'https://staging-gateway.wrld.xyz/auth/signUp?csrf-bypass=true', body: { providerKey: "0x6ebb625b6dc64614d87fa978e6fa7756843775b9"}, failOnStatusCode: false }).then(
        (response) => {
          expect(response.status).to.eq(422)
        })
    })

    it('user inputs the valid providerKey and invalid providerType param', () => {
      cy.request({ method: 'POST', url: 'https://staging-gateway.wrld.xyz/auth/signUp?csrf-bypass=true', body: { providerKey: "0x6ebb625b6dc64614d87fa978e6fa7756843775b9", providerType: "gold" }, failOnStatusCode: false }).then(
        (response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.have.property('message')
          expect(response.body.error.message).contains('invalid provider type.')
        })
    })

    it('user inputs the valid providerKey and invalid providerType param', () => {
      cy.request({ method: 'POST', url: 'https://staging-gateway.wrld.xyz/auth/signUp?csrf-bypass=true', body: { providerKey: "0x6ebb625b6dc64614d87fa978e6fa7756843775b9", providerType: "gold" }, failOnStatusCode: false }).then(
        (response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.have.property('message')
          expect(response.body.error.message).contains('invalid provider type.')
        })
    })

    it('user inputs the valid providerType and leaves the providerKey param EMPTY', () => {
      cy.request({ method: 'POST', url: 'https://staging-gateway.wrld.xyz/auth/signUp?csrf-bypass=true', body: { providerKey: "", providerType: "wallet" }, failOnStatusCode: false }).then(
        (response) => {
          expect(response.status).to.eq(422)
          expect(response.body.success).to.eq(false)
        })
    })

  });
});

