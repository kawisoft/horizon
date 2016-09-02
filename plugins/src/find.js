'use strict';

const {isObject} = require('./common/utils');

function find(req, res, next) {
  const args = req.options.find;
  if (args.length !== 1) {
    next(new Error(`"find" expected 1 argument but found ${args.length}.`));
  } else if (!isObject(args[0])) {
    next(new Error('First argument to "find" must be an object.'));
  } else {
    req.setParameter(args[0]);
    next();
  }
}

module.exports = () => ({
  name: 'hz_find',
  activate: () => ({
    methods: {
      find: {
        type: 'option',
        handler: find,
      },
    },
  }),
});