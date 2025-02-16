export const paginateData = async (Model, page = 1, limit = 10, query = {}) => {
  try {
    const skip = (page - 1) * limit;

    const data = await Model.find(query).skip(skip).limit(Number(limit));

    const totalRecords = await Model.countDocuments(query);

    return {
      data,
      pagination: {
        totalRecords,
        currentPage: Number(page),
        totalPages: Math.ceil(totalRecords / limit),
        limit: Number(limit),
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
