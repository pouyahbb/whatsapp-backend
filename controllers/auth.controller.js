export const register = async (req, res, next) => {
  try {
    res.send("register");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    res.send("login");
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.send("logout");
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    res.send("refrresh token");
  } catch (err) {
    next(err);
  }
};
