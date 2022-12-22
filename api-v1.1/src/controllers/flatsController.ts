import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

import { getApartments } from '@services/srealityApi';
import { selectFields } from '@selectors/selectFields';
import prisma from '@lib/prisma';

import type { Flat } from '../types/Flat';

export const getAllFlats = async (req: Request, res: Response) => {
  try {
    const { take, skip } = req.query;

    const takeNumber = take ? parseInt(take as string) : 20;
    const skipNumber = skip ? parseInt(skip as string) : 0;

    if (takeNumber < 0 || skipNumber < 0)
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid query parameters' });

    let flats: Flat[];
    let flatsCount: number;

    flats = await prisma.flat.findMany({
      take: takeNumber,
      skip: skipNumber,
    });
    flatsCount = await prisma.flat.count();

    if (flatsCount === 0) {
      await populateFlats();

      flats = await prisma.flat.findMany({
        take: takeNumber,
        skip: skipNumber,
      });
      flatsCount = await prisma.flat.count();
    }

    res.status(200).json({
      status: 'success',
      data: {
        count: flatsCount,
        flats,
      },
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const scrapeFlats = async (_req: Request, res: Response) => {
  try {
    const data = await populateFlats();

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

const populateFlats = async (): Promise<Prisma> => {
  let payload: Prisma.BatchPayload;

  try {
    const apartments = await getApartments();
    const data = apartments.map(apartment => selectFields(apartment));

    if (data.length > 0) {
      await prisma.flat.deleteMany();

      payload = await prisma.flat.createMany({
        data,
        skipDuplicates: true,
      });
    }

    return payload;
  } catch (err) {
    console.log('Error: ', err);
  }
};
