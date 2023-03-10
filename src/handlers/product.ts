import prisma from '../db';

// Get all
export const getProducts = async (req, res) => {
  const {id: userId} = req.user;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
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
// !! Shit not working, return is null because of belongsToId: id
export const getOneProduct = async (req, res) => {
  const {id} = req.params;
  const {id: userId} = req.user;

  const product = await prisma.product.findFirst({
    where: {
      id: id,
      belongsToId: userId,
    },
  });

  res.json({
    data: product,
  });
};

export const createProduct = async (req, res, next) => {
  const {name} = req.body;
  const {id: userId} = req.user;

  try {
    const product = await prisma.product.create({
      data: {
        name: name,
        belongsToId: userId,
      },
    });

    res.json({data: product});
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const {id} = req.params;
  const {id: userId} = req.user;
  const {name} = req.body;

  try {
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
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const {id} = req.params;
  const {id: userId} = req.user;

  try {
    const deleted = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id: id,
          belongsToId: userId,
        },
      },
    });

    res.json({data: deleted});
  } catch (error) {
    next(error);
  }
};
