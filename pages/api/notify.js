import { verifySignature } from "@upstash/qstash/nextjs"

export const config = {
  api: { bodyParser: false },
}

async function handler(request, response) {
  console.log(request.body)
  response.send("OK")
}

export default verifySignature(handler, {
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
})
