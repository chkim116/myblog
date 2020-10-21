export const totalView = (req, res) => {
  const ip = ip();

  try {
    res.status(200);
  } catch (err) {
    res.status(400);
    console.log(err);
  }
};
