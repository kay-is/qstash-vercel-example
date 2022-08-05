import { Receiver } from "@upstash/qstash"

const qstashReceiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
})

export default async function handler(request, response) {
  console.log(request.method)
  console.log(request.body)

  const isValid = await qstashReceiver.verify({
    signature: request.headers["Upstash-Signature"],
    body: request.body,
  })

  console.log("Is Valid:", isValid)

  response.end(isValid)
}
