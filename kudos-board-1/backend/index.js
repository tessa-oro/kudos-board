const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const app = express;
const port = 3000;

app.request(express.json());

app.get('/kudosCards', async (req, res) => {
    const kudosCards = await prisma.kudosCard.findMany()
    res.json(kudosCards)
})

app.post('/kudosCards', async (req, res) => {
    if (!req.body.title || !req.body.category) {
        return res.status(400).send('Title and category are required.')
    }
    const { title, category, author } = req.body
    const newKudosCard = await prisma.kudosCard.create({
      data: {
        title,
        category,
        author
      }
    })
    res.json(newKudosCard)
})

app.put('/kudosCards/:id', async (req, res) => {
    const { id } = req.params
    const { title, category, author } = req.body
    const updatedKudosCard = await prisma.kudosCard.update({
      where: { id: parseInt(id) },
      data: {
        title,
        category,
        author
      }
    })
    res.json(updatedKudosCard)
})

app.delete('/kudosCards/:id', async (req, res) => {
    const { id } = req.params
    const deletedKudosCard = await prisma.kudosCard.delete({
      where: { id: parseInt(id) }
    })
    res.json(deletedKudosCard)
})

app.get('/kudosPosts', async (req, res) => {
    const kudosPosts = await prisma.kudosPost.findMany()
    res.json(kudosPosts)
})

app.post('/kudosPosts', async (req, res) => {
    if (!req.body.message || !req.body.gif) {
        return res.status(400).send('Message and gif are required.')
    }
    const { message, gif, author, cardId, votes } = req.body
    const newKudosPost = await prisma.kudosPost.create({
      data: {
        message,
        gif,
        author,
        votes,
        cardId
      }
    })
    res.json(newKudosPost)
})

//to edit the number of upvotes on a post (double check if this is correct way to create a patch)
app.patch('/kudosPosts/:id', async (req, res) => {
    const { id } = req.params
    const { message, gif, author, cardId, votes } = req.body
    const updatedKudosCard = await prisma.kudosCard.update({
      where: { id: parseInt(id) },
      data: {
        message,
        gif,
        author,
        cardId,
        votes
      }
    })
    res.json(updatedKudosCard)
})

app.delete('/kudosPosts/:id', async (req, res) => {
    const { id } = req.params
    const deletedKudosPost = await prisma.kudosPost.delete({
      where: { id: parseInt(id) }
    })
    res.json(deletedKudosPost)
})

app.listen(port, () => {
    console.log('starting');
})