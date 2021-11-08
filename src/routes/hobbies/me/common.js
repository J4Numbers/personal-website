const testNotLoggedIn = async (req, res, next) => {
  if (!res.nunjucks.friendly) {
    res.redirect(303, '/hobbies/me/login', next);
  } else {
    next();
  }
};

const testLoggedIn = async (req, res, next) => {
  if (res.nunjucks.friendly) {
    res.redirect(303, '/hobbies/me', next);
  } else {
    next();
  }
};

module.exports = {
  testFriendLoggedIn: testLoggedIn,
  testFriendNotLoggedIn: testNotLoggedIn,
};
