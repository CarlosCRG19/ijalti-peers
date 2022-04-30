import { Response, Request } from 'express';

import { Offer } from '../models';
import { NoEntityFoundError } from '../errors';

export const getAll = async(req: Request, res: Response): Promise<void> => {
    try {
        const offers = await Offer.find({ relations: ['company'] });

        if (!offers || !offers.length) throw new NoEntityFoundError(Offer.name);

        res.status(200).send({ message: 'Offers found', offers: [ ...offers ] });
    } catch(error) {
        res.status(404).send({ error });
    }
}

export const create = async(req: Request, res: Response): Promise<void> => {
    try {
        const newOffer = Offer.create(req.body);

        await newOffer.save();

        res.status(200).send({ message: 'Offer created', offer: newOffer });
    } catch(error) {
        res.status(404).send({ error });
    }
}

export const get = async(req: Request, res: Response): Promise<void> => {
    try {
        const offer = await Offer.findOne({ 
            where: { id: +req.params.offerId }, 
            relations: ['company']
        });

        if (!offer) throw new NoEntityFoundError(Offer.name);

        res.status(200).send({ message: 'Offer found', offer });
    } catch(error) {
        res.status(404).send({ error });
    }
}

export const update = async(req: Request, res: Response): Promise<void> => {
    try {
        const offer = await Offer.findOneBy({ id: +req.params.offerId });

        if (!offer) throw new NoEntityFoundError(Offer.name);

        Object.assign(offer, req.body);

        await offer.save();

        res.status(200).send({ message: 'Offer updated', offer });
    } catch(error) {
        res.status(404).send({ error });
    }
}

export const remove = async(req: Request, res: Response): Promise<void> => {
    try {
        const offer = await Offer.findOneBy({ id: +req.params.offerId });

        if (!offer) throw new NoEntityFoundError(Offer.name);

        await offer.remove();

        res.status(200).send({ message: 'Offer deleted' });
    } catch(error) {
        res.status(404).send({ error });
    }
}
