import express from 'express';

import * as companies from '../controllers/companies';

const router = express.Router();

router.get('/', companies.getAll);

router.post('/', companies.create);
router.get('/:companyId', companies.get);
router.put('/:companyId', companies.update);
router.delete('/:companyId', companies.remove);

export default router;
