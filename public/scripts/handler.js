const handler = async () => {
    try {
        const longUrl = document.querySelector('#hero-field').value
        const shortUrlParagraph = document.querySelector('#short-url')
    
        const req = await fetch('api/shorten', {
            method: 'POST',
            body: JSON.stringify({ longUrl }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json())

        if (req.shortUrl === undefined) {
            shortUrlParagraph.innerHTML = req
            return
        }
    
        shortUrlParagraph.innerHTML = req.shortUrl

        return { longUrl, req }
    } catch (e) {
        console.log(e)
    }
}

document.querySelector('#button-submit').addEventListener('click', handler)

module.exports = handler