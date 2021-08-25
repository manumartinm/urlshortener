const apiAuthorizationMiddleware = (req, res) => {
    const value = req.headers['Authorization']
    const { API_KEY } = process.env
    if (value !== API_KEY) {
        return res.json('No estas autorizado')
    }
}

module.exports = apiAuthorizationMiddleware