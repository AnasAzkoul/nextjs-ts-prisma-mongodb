import { prisma } from '../../../Utils/db';
import { newUserSchema } from '@/Utils/validation';
import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await prisma.$connect();

  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    const result = newUserSchema.safeParse({ name, email, password });

    if (!result.success) {
      res.status(422).json({ message: result.error });
      return;
    }

    const user = await prisma.user.findFirst({ where: { email } });

    if (user) {
      res.status(422).json('a user with this email already exists');
    }

    const hashedPassword = await hash(password, 12);

    try {
      await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
    } catch (error) {
      res.status(422).json('could not create a new user in the database');
    }

    try {
      await transporter.sendMail({
        from: process.env.email,
        to: email,
        subject: 'It worked',
        html: '<html><h1>This is working congrats</h1></html>',
      });
    } catch (error) {
      console.log(error);
    }

    res.status(201).json({ message: 'success', user: { name, email } });
  } else {
    res.status(200).json('auth route working');
  }
}

export default handler;
