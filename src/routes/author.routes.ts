import { Router } from 'express';
import { getAuthors } from '../controller/author.controller';


const router = Router();

router.get('/', getAuthors);

export default router;
