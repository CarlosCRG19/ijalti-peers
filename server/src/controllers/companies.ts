import { Response, Request } from 'express';

import { Company } from '../models';
import { NoEntityFoundError } from '../errors';

export const getAll = async(req: Request, res: Response): Promise<void> => {
    try {
        const companies = await Company.find();

        if (!companies || !companies.length) throw new NoEntityFoundError(Company.name);

        res.status(200).send({ message: 'Companies found', companies: [ ...companies ] });
    } catch(error) {
        res.status(404).send({ error });
    }
}

export const create = async(req: Request, res: Response): Promise<void> => {
    try {
        const newCompany = Company.create(req.body);

        await newCompany.save();

        res.status(200).send({ message: 'Company created', company: newCompany });
    } catch(error) {
        res.status(404).send({ error });
    }
}

export const get = async(req: Request, res: Response): Promise<void> => {
    try {
        const company = await Company.findOneBy({ id: +req.params.companyId });

        if (!company) throw new NoEntityFoundError(Company.name);

        res.status(200).send({ message: 'Company found', company });
    } catch(error) {
        res.status(404).send({ error });
    }
}

export const update = async(req: Request, res: Response): Promise<void> => {
    try {
        const company = await Company.findOneBy({ id: +req.params.companyId });

        if (!company) throw new NoEntityFoundError(Company.name);

        Object.assign(company, req.body);

        await company.save();

        res.status(200).send({ message: 'Company updated', company });
    } catch(error) {
        res.status(404).send({ error });
    }
}

export const remove = async(req: Request, res: Response): Promise<void> => {
    try {
        const company = await Company.findOneBy({ id: +req.params.companyId });

        if (!company) throw new NoEntityFoundError(Company.name);

        await company.remove();

        res.status(200).send({ message: 'Company deleted' });
    } catch(error) {
        res.status(404).send({ error });
    }
}
