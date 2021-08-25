const shorten = 'http://localhost:3000/api/shorten'
const fetch = require('node-fetch')
const BASE_URL = process.env.BASE_URL || 'localhost:3000'
const shortURL = async (longUrl) => {
    try {      
        const req = await fetch(shorten, {
            method: 'POST',
            body: JSON.stringify({ longUrl }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
    
        return req
    } catch (error) {
        return
    }
}

describe('Test api', () => {
    test('Expected to return json with long Url property', async () => {
        const res = await shortURL('https://nike.com')

        expect(res).toHaveProperty('longUrl')
    })

    test('Expected to throw error when parsing a url without https?', async () => {
        const res = await shortURL('nike.com')

        expect(res).toEqual(expect.stringMatching('La url es invalida'))
    })

    test('Expected to throw error when parsing a url without tld', async () => {
        const res = await shortURL('https://nike')

        expect(res).toEqual(expect.stringMatching('La url es invalida'))
    })

    test('Expect url code to be valid', async () => {
        const res = await shortURL('https://nike.com')

        expect(res.urlCode).toMatch(new RegExp('[A-Za-z0-9]{9}'))
    })

    test('Short Url domain be equal to website domain', async () => {
        const res = await shortURL('https://nike.com')

        const code = res.shortUrl.split('/')[0]

        expect(code).toEqual(BASE_URL)
    })

    test('Expected to throw error when not parsing api key', async () => {
        const req = await fetch(shorten, {
            method: 'POST',
            body: JSON.stringify({ longUrl }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())

        expect(req).toEqual(expect.stringMatching('No estas autorizado'))
    })
})