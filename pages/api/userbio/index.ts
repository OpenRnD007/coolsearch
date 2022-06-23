import { NextApiRequest, NextApiResponse } from 'next'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        fetch(`https://api.github.com/users/${_req.query.user}`, {
            "method": "get",
            headers: new Headers({
                'Authorization': 'token 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'
            })
        })
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