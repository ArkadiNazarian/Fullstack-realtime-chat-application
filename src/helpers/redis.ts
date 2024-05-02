const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL
const upstashRedisToken = process.env.UPSTASH_REDIS_REST_TOKEN

type Command = 'zrange' | 'sismember' | 'get' | 'smembers'

export const FetchRedis = async (command: Command, ...args: Array<string | number>) => {
    const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`

    const response = await fetch(commandUrl, {
        headers: {
            Authorization: `Bearer ${upstashRedisToken}`
        },
        cache: 'no-store'
    })

    if (!response.ok) {
        throw new Error(`Error executing Redis command: ${response.statusText}`)
    }

    const data = await response.json()
    return data.result
}