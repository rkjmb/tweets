import { authMessage } from '../errors/errors.js';
import { get } from '../helpers/util.js';

import dotenv from 'dotenv';

dotenv.config();



const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

const getTrends = async (req, res) => {
    const trendsUrl = new URL(
        `https://api.twitter.com/1.1/trends/place.json?id=${req.query.id}`
    );

    if (!BEARER_TOKEN) {
        res.status(400).send(authMessage);
    }
    const token = BEARER_TOKEN;
    const requestConfig = {
        url: trendsUrl,
        auth: {
            bearer: token,
        },
        json: true,
    };
    try {
        const response = await get(requestConfig);

        if (response.statusCode !== 200) {
            if (response.statusCode === 403) {
                res.status(403).send(response.body);
            } else {
                throw new Error(response.body.error.message);
            }
        }

        res.send(response);
    } catch (e) {
        res.send(e);
    }
}

export { getTrends }