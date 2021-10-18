import request from 'request';

const streamURL = new URL(
    "https://api.twitter.com/2/tweets/sample/stream?tweet.fields=created_at&expansions=author_id&user.fields=profile_image_url"
)

let timeout = 0;

const sleep = async (delay) => {
    return new Promise((resolve) => setTimeout(() => resolve(true), delay));
};

const streamTweets = (socket, token) => {
    const config = {
        url: streamURL,
        auth: {
            bearer: token,
        },
        timeout: 31000,
    };

    try {
        const stream = request.get(config);

        stream
            .on("data", (data) => {
                try {
                    const json = JSON.parse(data);
                    if (json.connection_issue) {
                        socket.emit("error", json);
                        retry(stream, socket, token);
                    } else {
                        if (json.data) {
                            socket.emit("tweet", json);
                        } else {
                            socket.emit("authError", json);
                        }
                    }
                } catch (e) {
                    socket.emit("retrying", e);
                }
            })
            .on("error", (error) => {
                socket.emit("error", "Error");
                retry(stream, socket, token);
            });
    } catch (e) {
        socket.emit("authError", authMessage);
    }
};


const retry = async (stream, socket, token) => {
    timeout++;
    stream.abort();
    await sleep(2 ** timeout * 1000);
    streamTweets(socket, token);
};

export { streamTweets };