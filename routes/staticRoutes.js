import express from 'express';

export const router = express.Router();

router.get('/form', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

