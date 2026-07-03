import express from 'express'
import cors from 'cors'
import { filmeRoutes } from './routes/filme.routes';
import { authRoutes } from './routes/auth.routes';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(cookieParser());
app.use('/filmes',filmeRoutes);
app.use('/auth', authRoutes);

export {app};
