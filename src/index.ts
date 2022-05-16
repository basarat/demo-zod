import express from 'express';
import { api } from './api';

const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(express.json());
app.use(function (_req, res, next) {
  res.removeHeader('X-Powered-By');
  res.removeHeader('Date');
  next();
});
app.use('/api', api);

app.listen(PORT)
  .on('listening', () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
