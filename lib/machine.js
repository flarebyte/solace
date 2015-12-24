import _ from 'lodash';

const stringify = (value) => {
  return JSON.stringify(value) + '\n';
};

export default {

  name: 'machine',
  title: 'Format the output in a compact manner easily readable by a machine',

  writeError: (messager, message, options) => {
    const hasTitle = _.isString(options.title);
    if (hasTitle) {
      messager.write(`${options.title}: ${message}\n`);
    } else {
      messager.write(`${message}\n`);
    }
  }, //end write

  writeSimpleValue: (messager, message, options) => {
    const hasTitle = _.isString(options.title);
    if (hasTitle) {
      messager.write(`${options.title}: ${message}\n`);
    } else {
      messager.write(`${message}\n`);
    }
  }, //end write

  writeObject: (messager, message) => {
    messager.write(stringify(message));
  },

  writeEmptyArray: (messager, message) => {
    messager.write(stringify(message));
  },

  writeArrayOfSimpleValues: (messager, message) => {
    messager.write(stringify(message));
  },

  writeArrayOfSimpleObjects: (messager, message) => {
    messager.write(stringify(message));
  }

};
