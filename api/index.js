const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { StreamChat } = require('stream-chat')
require('dotenv').config()

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const serverSideClient = new StreamChat(
  process.env.STREAM_API_KEY,
  process.env.STREAM_APP_SECRET
)

app.post('/join', async (req, res) => {
  const { username } = req.body

  const token = serverSideClient.createToken(username)

  return res.status(200).json({ user: { username }, token })
})

app.post('/add-member', async (req, res) => {
    const { id, channelName } = req.body
  
    const channel = serverSideClient.channel("messaging", channelName, {});
    await channel.addMembers([{user_id: id}])
  
    return res.status(200)
  })

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})