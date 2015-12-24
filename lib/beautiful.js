import _ from 'lodash';
import chalk from 'chalk';

const stringify = (value) => {
  return JSON.stringify(value, null, ' ') + '\n';
};

const asTitle = (title) => {
  return chalk.cyan(title);
};

const asError = (text) => {
  return chalk.red(text);
};
export default {

  name: 'beautify',
  title: 'Format the output in a beautiful manner',

  writeError: (messager, message, options) => {
    const hasTitle = _.isString(options.title);
    if (hasTitle) {
      messager.write(asTitle(options.title) + ': ' + asError(message) + '\n');
    } else {
      messager.write(asError(message) + '\n');
    }
  }, //end write

  writeSimpleValue: (messager, message, options) => {
    const hasTitle = _.isString(options.title);
    if (hasTitle) {
      messager.write(asTitle(options.title) + `: ${message}\n`);
    } else {
      messager.write(`${message}\n`);
    }

  }, //end write

  writeObject: (messager, message, options) => {
    const hasTitle = _.isString(options.title);
    if (hasTitle) {
      messager.write(asTitle(options.title) + ':\n\n' + stringify(message));
    } else {
      messager.write(stringify(message));
    }
  },

  writeEmptyArray: (messager, message, options) => {
    const hasTitle = _.isString(options.title);
    if (hasTitle) {
      messager.write(asTitle(options.title) + ': ' + stringify(message));
    } else {
      messager.write(stringify(message));
    }
  },

  writeArrayOfSimpleValues: (messager, message, options) => {
    const hasTitle = _.isString(options.title);
    if (hasTitle) {
      messager.write(asTitle(options.title) + ':\n\n' + stringify(message));
    } else {
      messager.write(stringify(message));
    }
  },

  writeArrayOfSimpleObjects: (messager, message, options) => {
    const hasTitle = _.isString(options.title);
    if (hasTitle) {
      messager.write(asTitle(options.title) + ':\n\n' + stringify(message));
    } else {
      messager.write(stringify(message));
    }
  }

};
