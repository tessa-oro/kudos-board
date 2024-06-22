const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/kudosCards', async (req, res) => {
    const kudosCards = await prisma.kudosCard.findMany()
    res.status(200).json(kudosCards)
})

app.get('/kudosCards/show/recent', async (req, res) => {
    try {
      const kudosCards = await prisma.kudosCard.findMany({
          orderBy: {
              id: 'desc'
          },
          take: 4
      });
      res.status(200).json(kudosCards);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the cards." });
    }
})

app.get('/kudosCards/:id', async (req, res) => {
  const { id } = req.params
  const kudosCards = await prisma.kudosCard.findUnique(
    {
      where: { id: parseInt(id) },
  })
  res.status(200).json(kudosCards)
})

app.get('/kudosCards/search/:title', async (req, res) => {
  const { title } = req.params; 
  try {
    const kudosCards = await prisma.kudosCard.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive' 
        }
      }
    });
    res.status(200).json(kudosCards);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the cards." });
  }
});

app.get('/kudosCards/show/celebration', async (req, res) => {
  try {
    const kudosCards = await prisma.kudosCard.findMany({
      where: { category: 'celebration' }
    });
    res.status(200).json(kudosCards);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the cards." });
  }
})

app.get('/kudosCards/show/inspiration', async (req, res) => {
  try {
    const kudosCards = await prisma.kudosCard.findMany({
      where: { category: 'inspiration' }
    });
    res.status(200).json(kudosCards);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the cards." });
  }
})

app.get('/kudosCards/show/thankYou', async (req, res) => {
  try {
    const kudosCards = await prisma.kudosCard.findMany({
      where: { category: 'thankYou' }
    });
    res.status(200).json(kudosCards);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the cards." });
  }
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
    res.status(200).json(updatedKudosCard)
})

app.delete('/kudosCards/:id/delete', async (req, res) => {
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

app.get('/kudosPosts/:cardId', async (req, res) => {
    const { cardId } = req.params
    try {
      const kudosPosts = await prisma.kudosPost.findMany({
        where: { cardId: parseInt(cardId) 
        }
      });
      res.status(200).json(kudosPosts);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching the posts." });
    }
})

app.get('/comments/:postId', async (req, res) => {
  const { postId } = req.params
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) 
      }
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the comments." });
  }
})

app.post('/kudosPosts/:cardId/create/', async (req, res) => {
    if (!req.body.message || !req.body.gif) {
        return res.status(400).send('Message and gif are required.')
    }
    const {cardId} = req.params
    const { title, message, gif, author } = req.body
    const newKudosPost = await prisma.kudosPost.create({
      data: {
        title,
        message,
        gif,
        votes : 0,
        author,
        cardId : parseInt(cardId)
      }
    })
    res.json(newKudosPost)
})

app.post('/comments/:postId/create/', async (req, res) => {
  const {postId} = req.params
  const { content } = req.body
  const newComment = await prisma.comment.create({
    data: {
      content,
      postId : parseInt(postId)
    }
  })
  res.json(newComment)
})

app.patch('/kudosPosts/upvote/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const updatedKudosPost = await prisma.kudosPost.update({
        where: { id: parseInt(id) },
        data: {
          votes: {
            increment: 1
          }
        }
      })
      res.status(200).json(updatedKudosPost)
  } catch (error) {
    res.status(500).json({error : "could not upvote post"});
  }
})

app.delete('/kudosPosts/:id/delete', async (req, res) => {
    const { id } = req.params
    const deletedKudosPost = await prisma.kudosPost.delete({
      where: { id: parseInt(id) }
    })
    res.json(deletedKudosPost)
})

app.listen(port, () => {
    console.log('starting');
})