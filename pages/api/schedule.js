import { Client } from "@upstash/qstash"

const qstashClient = new Client({ token: process.env.QSTASH_TOKEN })

export default async function handler(request, response) {
  if (request.method !== "POST") return response.end()

  const { host } = request.headers
  const body = JSON.parse(request.body)

  const qstashResponse = await qstashClient.publishJSON({
    url: `https://${host}/api/notify`,
    body,
  })

  response.status(201).send(qstashResponse)
}
