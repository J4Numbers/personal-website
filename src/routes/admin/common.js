const testNotLoggedIn = async (req, res, next) => {
  if (!res.nunjucks.logged_in) {
    res.redirect(303, '/admin/login', next);
  } else {
    next();
  }
};

const testLoggedIn = async (req, res, next) => {
  if (res.nunjucks.logged_in) {
    res.redirect(303, '/admin', next);
  } else {
    next();
  }
};

module.exports = {
  testAdministratorNotLoggedIn: testNotLoggedIn,
  testAdministratorLoggedIn: testLoggedIn,
};
