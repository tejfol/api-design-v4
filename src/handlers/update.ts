import prisma from '../db';

export const getOneUpdate = async (req, res) => {
  const {id} = req.params;

  const update = await prisma.update.findFirst({
    where: {
      id: id,
    },
  });

  res.json({data: update});
};

export const getUpdates = async (req, res) => {
  const {id: userId} = req.user;

  const products = await prisma.product.findMany({
    where: {
      belongsToId: userId,
    },
    include: {
      updates: true,
    },
  });

  // Not efficient to store data like this in the buffer
  // should find a way to tell the database to do this for me
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({data: updates});
};

export const createUpdate = async (req, res) => {
  const {productId} = req.body;
  const {id: userId} = req.user;

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      belongsToId: userId,
    },
  });

  if (!product) {
    // does not belong to user
    return res.json({message: 'Not your product'});
  }

  const update = await prisma.update.create({
    data: req.body,
  });

  res.json({data: update});
};

export const updateUpdate = async (req, res) => {
  const {id: userId} = req.user;

  const products = await prisma.product.findMany({
    where: {
      belongsToId: userId,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.filter(update => update.id === userId);

  if (!match) {
    res.json({message: 'not found any match'});
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({data: updatedUpdate});
};

export const deleteUpdate = async (req, res) => {
  const {id} = req.user;

  const products = await prisma.product.findMany({
    where: {
      belongsToId: id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.filter(update => update.id === id);

  if (!match) {
    res.json({message: 'not found any match'});
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({data: deleted});
};
