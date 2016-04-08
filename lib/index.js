import Joi from 'joi';
import _ from 'lodash';
import moment from 'moment';

import machine from './machine.js';
import beautiful from './beautiful.js';
import outline from './outline.js';


const MACHINE = 'machine';
const BEAUTIFUL = 'beautiful';
const OUTLINE = 'outline';

const confSchema = Joi.object().keys({
  standardOut: Joi.object(),
  standardErr: Joi.object(),
  defaultTheme: Joi.string().valid(MACHINE, BEAUTIFUL, OUTLINE)
});

const optionsSchema = Joi.object().keys({
  title: Joi.string(),
  theme: Joi.string().valid(MACHINE, BEAUTIFUL, OUTLINE)
});

const isValueSimple = (value) => {
  return _.isBoolean(value) || _.isDate(value) || _.isNumber(value) || _.isString(value) || _.isNull(value);
};

const isArrayOfSimpleValues = (values) => {
  return _.every(values, isValueSimple);
};

const isArrayOfSimpleObjects = (values) => {
  return _.every(values, isArrayOfSimpleValues);
};

export default (cfg) => {
  Joi.assert(cfg, confSchema);
  const stdOut = cfg.standardOut ? cfg.standardOut : process.stdout;
  const stdErr = cfg.standardErr ? cfg.standardErr : process.stderr;
  const themes = {
    machine: machine,
    beautiful: beautiful,
    outline: outline
  };
  const defaultTheme = cfg.defaultTheme ? cfg.defaultTheme : BEAUTIFUL;

  const log = (message, options = {}) => {
    Joi.assert(options, optionsSchema);
    const themeName = options.theme ? options.theme : defaultTheme;
    const theme = themes[themeName];

    /* Error ?*/
    const isError = _.isError(message);
    const isNaN = _.isNaN(message);
    const isUndefined = _.isUndefined(message);
    const isFunction = _.isFunction(message);

    /* Simple value ?*/
    const isNull = _.isNull(message);
    const isBoolean = _.isBoolean(message);
    const isDate = _.isDate(message);
    const isNumber = _.isNumber(message);
    const isRegExp = _.isRegExp(message);
    const isString = _.isString(message);

    /* Complex object ?*/
    const isObject = _.isObject(message);
    const isPlainObject = _.isPlainObject(message);

    /* Array ?*/
    const isArray = _.isArray(message);
    const isArguments = _.isArguments(message);
    const isTypedArray = _.isTypedArray(message);

    const useStdErr = isError || isFunction || isNaN || isUndefined;

    const messager = useStdErr ? stdErr : stdOut;
    if (useStdErr) {
      const errMsg = [
        isError ? `${message}` : '',
        isNaN ? 'value is not a number' : '',
        isUndefined ? 'value is undefined' : '',
        isFunction ? 'value is a function' : ''
      ].join('');
      theme.writeError(messager, errMsg, options);
      return message;
    }

    const isSimpleValue = isNull || isBoolean || isDate || isNumber || isRegExp || isString;
    if (isSimpleValue) {
      const simpleMsg = [
        isNull ? 'value is null' : '',
        isBoolean ? `${message}` : '',
        isDate ? moment(message).format() : '',
        isNumber ? `${message}` : '',
        isRegExp ? `${message}` : '',
        isString ? `${message}` : ''
      ].join('');
      theme.writeSimpleValue(messager, simpleMsg, options);
      return message;
    }

    const isArr = isArray || isArguments || isTypedArray;
    if (isArr) {
      const isEmptyArray = _.isEmpty(message);
      if (isEmptyArray) {
        theme.writeEmptyArray(messager, message, options);
        return message;
      }
      if (isArrayOfSimpleValues(message)) {
        theme.writeArrayOfSimpleValues(messager, message, options);
        return message;
      }
      if (isArrayOfSimpleObjects(message)) {
        theme.writeArrayOfSimpleObjects(messager, message, options);
        return message;
      }
    }

    const isObj = isObject || isPlainObject;
    if (isObj) {
      const messageObj = isPlainObject ? message : _.toPlainObject(message);
      theme.writeObject(messager, messageObj, options);
      return message;
    }


  };

  return {
    log: log
  };

};
