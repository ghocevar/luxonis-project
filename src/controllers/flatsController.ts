import { Request, Response } from 'express';

import { getApartments } from '../services/srealityApi';
import { selectFields } from '../selectors/selectFields';
import prisma from '../lib/prisma';

export const getAllFlats = async (req: Request, res: Response) => {
  const { take, skip } = req.query;

  const takeNumber = take ? parseInt(take as string) : 20;
  const skipNumber = skip ? parseInt(skip as string) : 0;

  if (takeNumber < 0 || skipNumber < 0)
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid query parameters' });

  const flats = await prisma.flat.findMany({
    take: takeNumber,
    skip: skipNumber,
  });

  res.status(200).json({
    status: 'success',
    data: {
      flats,
    },
  });
};

export const scrapeFlats = async (req: Request, res: Response) => {
  const apartments = await getApartments();
  const data = apartments.map(apartment => selectFields(apartment));

  if (data.length > 0) {
    await prisma.flat.createMany({
      data,
      skipDuplicates: true,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      flats: data,
    },
  });
};
