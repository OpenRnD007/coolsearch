import { NextApiRequest, NextApiResponse } from 'next'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        let page = "&page=1"
        if (_req.query.page) {
            page = "&page=" + _req.query.page
        }
        fetch(`https://api.github.com/search/users?q=${_req.query.user}&per_page=100${page}`)
            .then(resp => resp.json())
            .then(data => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(500).json({ statusCode: 500, message: "No Data" })
            })
    } catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler