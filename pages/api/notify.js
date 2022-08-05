import { Receiver } from "@upstash/qstash"
import { text } from "micro"

export const config = {
  api: { bodyParser: false },
}

const qstashReceiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
})

export default async function handler(request, response) {
  const body = await text(request)

  console.log(body)

  const isValid = await qstashReceiver.verify({
    signature: request.headers["Upstash-Signature"],
    body,
  })

  console.log("Is Valid:", isValid)

  response.end(isValid)
}
