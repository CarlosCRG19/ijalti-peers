import express from 'express';

import * as offers from '../controllers/offers';

const router = express.Router();

router.get('/', offers.getAll);

router.post('/', offers.create);
router.get('/:offerId', offers.get);
router.put('/:offerId', offers.update);
router.delete('/:offerId', offers.remove);

export default router;
