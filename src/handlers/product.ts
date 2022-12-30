import prisma from '../db';

// Get all
export const getProducts = async (req, res) => {
  const {id} = req.user;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      products: true,
    },
  });

  res.json({
    data: user.products,
  });
};

// Get one
export const getOneProduct = async (req, res) => {
  const {id} = req.params;

  const product = await prisma.product.findFirst({
    where: {
      id: id,
      belongsToId: id,
    },
  });

  res.json({
    data: product,
  });
};

export const createProduct = async (req, res) => {
  const {name} = req.body;
  const {id} = req.user;

  const product = await prisma.product.create({
    data: {
      name: name,
      belongsToId: id,
    },
  });

  res.json({data: product});
};

export const updateProduct = async (req, res) => {
  console.log(req.user);

  const {id} = req.params;
  const {id: userId} = req.user;
  const {name} = req.body;

  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: id,
        belongsToId: userId,
      },
    },
    data: {
      name: name,
    },
  });

  res.json({data: updated});
};

export const deleteProduct = async (req, res) => {
  const {id} = req.params;
  const {id: userId} = req.user;

  const deleted = prisma.product.delete({
    where: {
      id_belongsToId: {
        id: id,
        belongsToId: userId,
      },
    },
  });

  res.json({data: deleted});
};
