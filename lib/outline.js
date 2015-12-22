import prettyjson from 'prettyjson';
import _ from 'lodash';
import chalk from 'chalk';
import moment from 'moment';
import Table from 'cli-table';

const asTitle = (title) => {
  return chalk.cyan(title);
};
const asError = (text) => {
  return chalk.red(text);
};
const niceJson = (value) => {
  return prettyjson.render(value, {}) + '\n';
};

const formatValue = (value) => {
  return _.isDate(value) ? moment(value).format() : `${value}`;
};

const objWithoutHeaders = (value, headers) => {
  const cloned = _.cloneDeep(value);
  _.forEach(headers, (h) => {
    delete cloned[h];
  });
  return cloned;
};
const objToRow = (value, headers) => {
  const size = _.size(headers);
  if (!value) {
    return _.fill(Array(size + 1), '___');
  }
  const isBigger = size > 2;
  const extra = isBigger ? JSON.stringify(objWithoutHeaders(value, headers)) : '';
  const row = _.map(headers, (key) => {
    return formatValue(value[key]);
  });
  row.push(extra);
  return row;
};

const tablify = (rows) => {
  const headers = _.keys(_.first(rows));
  const headersWithExtra = _.cloneDeep(headers);
  headersWithExtra.push('...');
  const table = new Table({
    head: headersWithExtra
  });
  _.forEach(rows, (row) => {
    table.push(objToRow(row, headers));
  });
  return table.toString() + '\n';
};


export default {

  name: 'outline',
  title: 'Format the output with the main outlines',

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
      messager.write(asTitle(options.title) + ':\n\n' + niceJson(message));
    } else {
      messager.write(niceJson(message));
    }
  },

  writeEmptyArray: (messager, message, options) => {
    const hasTitle = _.isString(options.title);
    if (hasTitle) {
      messager.write(asTitle(options.title) + ': ' + niceJson(message));
    } else {
      messager.write(niceJson(message));
    }
  },

  writeArrayOfSimpleValues: (messager, message, options) => {
    const hasTitle = _.isString(options.title);
    if (hasTitle) {
      messager.write(asTitle(options.title) + ':\n\n' + niceJson(message));
    } else {
      messager.write(niceJson(message));
    }
  },

  writeArrayOfSimpleObjects: (messager, message, options) => {
    const hasTitle = _.isString(options.title);
    if (hasTitle) {
      messager.write(asTitle(options.title) + ':\n\n' + tablify(message));
    } else {
      messager.write(tablify(message));
    }
  }

};
