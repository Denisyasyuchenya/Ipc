import express from 'express';
import bodyParser from 'body-parser';
import { router as userRouter } from './routes/userRoutes.js';
import {router as staticRouter} from './routes/staticRoutes.js';
import { tableCreator } from './controller/tableCreator.js';

const PORT = process.env.PORT || 8080;

const app = express();
tableCreator();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', userRouter);
app.use('/', staticRouter);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));