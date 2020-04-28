/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  const result = {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
  };
  return result;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const a = JSON.parse(json);
  Object.setPrototypeOf(a, proto);
  return a;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  idAttribute: undefined,
  tag: undefined,
  classes: [],
  href: undefined,
  pseudoCl: [],
  pseudoEl: undefined,
  combinator: undefined,
  selector2: undefined,
  selector1: undefined,

  element(value) {
    const self = { ...this };
    self.tag = value;
    return self;
  },

  id(value) {
    const self = { ...this };
    self.idAttribute = value;
    return self;
  },

  class(value) {
    const self = { ...this };
    self.classes.push(value);
    return self;
  },

  attr(value) {
    const self = { ...this };
    self.href = value;
    return self;
  },

  pseudoClass(value) {
    const self = { ...this };
    self.pseudoCl.push(value);
    return self;
  },

  pseudoElement(value) {
    const self = { ...this };
    self.pseudoEl = value;
    return self;
  },

  combine(selector1, combinator, selector2) {
    this.selector1 = selector1;
    this.selector2 = selector2;
    this.combinator = combinator;


    return this;
  },

  reset() {
    this.idAttribute = undefined;
    this.tag = undefined;
    this.classes = [];
    this.href = undefined;
    this.pseudoCl = [];
    this.pseudoEl = undefined;
    this.combinator = undefined;
    this.selector2 = undefined;
    this.selector1 = undefined;
  },

  stringify() {
    let result = '';

    if (this.tag) {
      result += `${this.tag}`;
    }

    if (this.href) {
      result += `[${this.href}]`;
    }

    if (this.idAttribute) {
      result += `#${this.idAttribute}`;
    }

    if (this.classes.length !== 0) {
      // this.classes.forEach((el) => result += `.${el}`);
    }

    if (this.pseudoCl.length !== 0) {
      // this.pseudoCl.forEach((el) => result += `:${el}`);
    }

    if (this.pseudoEl) {
      result += `::${this.pseudoEl}`;
    }

    if (this.selector1) {
      // result += this.selector1.stringify() + ' ' + this.combinator + ' '
      //   + this.selector2.stringify()
    }

    this.reset();

    return result;
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
