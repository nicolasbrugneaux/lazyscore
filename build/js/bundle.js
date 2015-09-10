(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g._ = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

exports.wrap = wrap;
exports.unwrap = unwrap;
exports.forEach = forEach;
exports.map = map;
exports.filter = filter;
exports.reduce = reduce;
exports.pluck = pluck;
exports.invoke = invoke;
exports.take = take;
exports.takeWhile = takeWhile;
exports.drop = drop;
exports.dropWhile = dropWhile;
exports.first = first;
exports.last = last;
exports.compact = compact;
exports.sequence = sequence;
var noop = function noop() {};
var always = function always() {
    return true;
};

function* enumerate(collection) {
    var i = 0;

    for (var item of collection) {
        yield [item, i++];
    }
}

function wrap(collection) {
    return enumerate(collection);
}

function unwrap(collection) {
    var unwrapped = [];
    for (var item of collection) {
        unwrapped.push(item);
    }
    return unwrapped;
}

var identity = function identity(id) {
    return id;
};

exports.identity = identity;

function* forEach(iteratee, collection) {
    if (iteratee === undefined) iteratee = noop;

    for (var _ref3 of enumerate(collection)) {
        var _ref2 = _slicedToArray(_ref3, 2);

        var item = _ref2[0];
        var i = _ref2[1];

        yield iteratee(item, i);
    }
}

function* map(transform, collection) {
    if (transform === undefined) transform = identity;

    for (var _ref43 of enumerate(collection)) {
        var _ref42 = _slicedToArray(_ref43, 2);

        var item = _ref42[0];
        var i = _ref42[1];

        yield transform(item, i);
    }
}

function* filter(predicate, collection) {
    if (predicate === undefined) predicate = always;

    for (var _ref53 of enumerate(collection)) {
        var _ref52 = _slicedToArray(_ref53, 2);

        var item = _ref52[0];
        var i = _ref52[1];

        if (predicate(item, i)) {
            yield item;
        }
    }
}

function reduce(transform, collection, initial) {
    var acc = initial;
    var ignore = acc === undefined;

    for (var _ref63 of enumerate(collection)) {
        var _ref62 = _slicedToArray(_ref63, 2);

        var item = _ref62[0];
        var i = _ref62[1];

        if (ignore) {
            ignore = false;
            continue;
        }

        acc = transform(acc, item, i);
    }

    return acc;
}

function* pluck(property, collection) {
    for (var item of collection) {
        yield item[property];
    }
}

function* invoke(property, collection) {
    for (var item of collection) {
        yield item[property]();
    }
}

function* take(size, collection) {
    for (var _ref73 of enumerate(collection)) {
        var _ref72 = _slicedToArray(_ref73, 2);

        var item = _ref72[0];
        var i = _ref72[1];

        if (i < size) {
            yield item;
            continue;
        }
        break;
    }
}

function* takeWhile(predicate, collection) {
    if (predicate === undefined) predicate = always;

    for (var _ref83 of enumerate(collection)) {
        var _ref82 = _slicedToArray(_ref83, 2);

        var item = _ref82[0];
        var i = _ref82[1];

        if (predicate(item, i)) {
            yield item;
            continue;
        }
        break;
    }
}

function* drop(size, collection) {
    for (var _ref93 of enumerate(collection)) {
        var _ref92 = _slicedToArray(_ref93, 2);

        var item = _ref92[0];
        var i = _ref92[1];

        if (i < size) {
            continue;
        }
        yield item;
    }
}

function* dropWhile(predicate, collection) {
    if (predicate === undefined) predicate = always;

    for (var _ref103 of enumerate(collection)) {
        var _ref102 = _slicedToArray(_ref103, 2);

        var item = _ref102[0];
        var i = _ref102[1];

        if (predicate(item, i)) {
            continue;
        }
        yield item;
    }
}

function first(collection) {
    for (var item of collection) {
        return item;
    }
}

function last(collection) {
    var item = undefined;
    for (item of collection) {
        continue;
    }

    return item;
}

function compact(collection) {
    return filter(identity, collection);
}

function* sequence() {
    var begin = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var max = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];
    var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

    for (var i = begin; i < max; i += step) {
        yield i;
    }
}

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL2xhenlzY29yZS9zcmMvbGF6eXNjb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTSxJQUFJLEdBQUcsU0FBUCxJQUFJLEdBQVMsRUFBRSxDQUFDO0FBQ3RCLElBQU0sTUFBTSxHQUFHLFNBQVQsTUFBTTtXQUFTLElBQUk7Q0FBQSxDQUFDOztBQUUxQixVQUFVLFNBQVMsQ0FBRSxVQUFVLEVBQy9CO0FBQ0ksUUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVWLFNBQU0sSUFBSSxJQUFJLElBQUksVUFBVSxFQUM1QjtBQUNJLGNBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUcsQ0FBQztLQUN2QjtDQUNKOztBQUVNLFNBQVMsSUFBSSxDQUFFLFVBQVUsRUFDaEM7QUFDSSxXQUFPLFNBQVMsQ0FBRSxVQUFVLENBQUUsQ0FBQztDQUNsQzs7QUFFTSxTQUFTLE1BQU0sQ0FBRSxVQUFVLEVBQ2xDO0FBQ0ksUUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLFNBQU0sSUFBSSxJQUFJLElBQUksVUFBVSxFQUM1QjtBQUNJLGlCQUFTLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFDO0tBQzFCO0FBQ0QsV0FBTyxTQUFTLENBQUM7Q0FDcEI7O0FBRU0sSUFBTSxRQUFRLEdBQUcsU0FBWCxRQUFRLENBQUcsRUFBRTtXQUFJLEVBQUU7Q0FBQSxDQUFDOzs7O0FBRTFCLFVBQVUsT0FBTyxDQUFFLFFBQVEsRUFBTyxVQUFVLEVBQ25EO1FBRDBCLFFBQVEsZ0JBQVIsUUFBUSxHQUFDLElBQUk7O0FBRW5DLHNCQUF1QixTQUFTLENBQUUsVUFBVSxDQUFFLEVBQzlDOzs7WUFEVyxJQUFJO1lBQUUsQ0FBQzs7QUFFZCxj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OztBQUVkLFlBQUssU0FBUyxDQUFFLElBQUksRUFBRSxDQUFDLENBQUUsRUFDekI7QUFDSSxxQkFBUztTQUNaO0FBQ0QsY0FBTSxJQUFJLENBQUM7S0FDZDtDQUNKOztBQUVNLFNBQVMsS0FBSyxDQUFFLFVBQVUsRUFDakM7QUFDSSxTQUFNLElBQUksSUFBSSxJQUFJLFVBQVUsRUFDNUI7QUFDSSxlQUFPLElBQUksQ0FBQztLQUNmO0NBQ0o7O0FBRU0sU0FBUyxJQUFJLENBQUUsVUFBVSxFQUNoQztBQUNJLFFBQUksSUFBSSxZQUFBLENBQUM7QUFDVCxTQUFNLElBQUksSUFBSSxVQUFVLEVBQ3hCO0FBQ0ksaUJBQVM7S0FDWjs7QUFFRCxXQUFPLElBQUksQ0FBQztDQUNmOztBQUVNLFNBQVMsT0FBTyxDQUFFLFVBQVUsRUFDbkM7QUFDSSxXQUFPLE1BQU0sQ0FBRSxRQUFRLEVBQUUsVUFBVSxDQUFFLENBQUM7Q0FDekM7O0FBRU0sVUFBVSxRQUFRLEdBQ3pCO1FBRDJCLEtBQUsseURBQUMsQ0FBQztRQUFFLEdBQUcseURBQUMsUUFBUTtRQUFFLElBQUkseURBQUMsQ0FBQzs7QUFFcEQsU0FBTSxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxFQUN2QztBQUNJLGNBQU0sQ0FBQyxDQUFDO0tBQ1g7Q0FDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBub29wID0gKCkgPT4ge307XG5jb25zdCBhbHdheXMgPSAoKSA9PiB0cnVlO1xuXG5mdW5jdGlvbiAqZW51bWVyYXRlKCBjb2xsZWN0aW9uIClcbntcbiAgICBsZXQgaSA9IDA7XG5cbiAgICBmb3IgKCBsZXQgaXRlbSBvZiBjb2xsZWN0aW9uIClcbiAgICB7XG4gICAgICAgIHlpZWxkIFtpdGVtLCBpKyssIF07XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcCggY29sbGVjdGlvbiApXG57XG4gICAgcmV0dXJuIGVudW1lcmF0ZSggY29sbGVjdGlvbiApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW53cmFwKCBjb2xsZWN0aW9uIClcbntcbiAgICBjb25zdCB1bndyYXBwZWQgPSBbXTtcbiAgICBmb3IgKCBsZXQgaXRlbSBvZiBjb2xsZWN0aW9uIClcbiAgICB7XG4gICAgICAgIHVud3JhcHBlZC5wdXNoKCBpdGVtICk7XG4gICAgfVxuICAgIHJldHVybiB1bndyYXBwZWQ7XG59XG5cbmV4cG9ydCBjb25zdCBpZGVudGl0eSA9IGlkID0+IGlkO1xuXG5leHBvcnQgZnVuY3Rpb24gKmZvckVhY2goIGl0ZXJhdGVlPW5vb3AsIGNvbGxlY3Rpb24gKVxue1xuICAgIGZvciAoIGxldCBbaXRlbSwgaV0gb2YgZW51bWVyYXRlKCBjb2xsZWN0aW9uICkgKVxuICAgIHtcbiAgICAgICAgeWllbGQgaXRlcmF0ZWUoIGl0ZW0sIGkgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqbWFwKCB0cmFuc2Zvcm09aWRlbnRpdHksIGNvbGxlY3Rpb24gKVxue1xuICAgIGZvciAoIGxldCBbaXRlbSwgaV0gb2YgZW51bWVyYXRlKCBjb2xsZWN0aW9uICkgKVxuICAgIHtcbiAgICAgICAgeWllbGQgdHJhbnNmb3JtKCBpdGVtLCBpICk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gKmZpbHRlciggcHJlZGljYXRlPWFsd2F5cywgY29sbGVjdGlvbiApXG57XG4gICAgZm9yICggbGV0IFtpdGVtLCBpXSBvZiBlbnVtZXJhdGUoIGNvbGxlY3Rpb24gKSApXG4gICAge1xuICAgICAgICBpZiAoIHByZWRpY2F0ZSggaXRlbSwgaSApIClcbiAgICAgICAge1xuICAgICAgICAgICAgeWllbGQgaXRlbTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZSggdHJhbnNmb3JtLCBjb2xsZWN0aW9uLCBpbml0aWFsIClcbntcbiAgICBsZXQgYWNjID0gaW5pdGlhbDtcbiAgICBsZXQgaWdub3JlID0gYWNjID09PSB1bmRlZmluZWQ7XG5cbiAgICBmb3IgKCBsZXQgW2l0ZW0sIGldIG9mIGVudW1lcmF0ZSggY29sbGVjdGlvbiApIClcbiAgICB7XG4gICAgICAgIGlmICggaWdub3JlIClcbiAgICAgICAge1xuICAgICAgICAgICAgaWdub3JlID0gZmFsc2U7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjYyA9IHRyYW5zZm9ybSggYWNjLCBpdGVtLCBpICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICpwbHVjayggcHJvcGVydHksIGNvbGxlY3Rpb24gKVxue1xuICAgIGZvciAoIGxldCBpdGVtIG9mIGNvbGxlY3Rpb24gKVxuICAgIHtcbiAgICAgICAgeWllbGQgaXRlbVtwcm9wZXJ0eV07XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gKmludm9rZSggcHJvcGVydHksIGNvbGxlY3Rpb24gKVxue1xuICAgIGZvciAoIGxldCBpdGVtIG9mIGNvbGxlY3Rpb24gKVxuICAgIHtcbiAgICAgICAgeWllbGQgaXRlbVtwcm9wZXJ0eV0oKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqdGFrZSggc2l6ZSwgY29sbGVjdGlvbiApXG57XG4gICAgZm9yICggbGV0IFtpdGVtLCBpXSBvZiBlbnVtZXJhdGUoIGNvbGxlY3Rpb24gKSApXG4gICAge1xuICAgICAgICBpZiAoIGkgPCBzaXplIClcbiAgICAgICAge1xuICAgICAgICAgICAgeWllbGQgaXRlbTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICp0YWtlV2hpbGUoIHByZWRpY2F0ZT1hbHdheXMsIGNvbGxlY3Rpb24gKVxue1xuICAgIGZvciAoIGxldCBbaXRlbSwgaV0gb2YgZW51bWVyYXRlKCBjb2xsZWN0aW9uICkgKVxuICAgIHtcbiAgICAgICAgaWYgKCBwcmVkaWNhdGUoIGl0ZW0sIGkgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHlpZWxkIGl0ZW07XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqZHJvcCggc2l6ZSwgY29sbGVjdGlvbiApXG57XG4gICAgZm9yICggbGV0IFtpdGVtLCBpXSBvZiBlbnVtZXJhdGUoIGNvbGxlY3Rpb24gKSApXG4gICAge1xuICAgICAgICBpZiAoIGkgPCBzaXplIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgeWllbGQgaXRlbTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqZHJvcFdoaWxlKCBwcmVkaWNhdGU9YWx3YXlzLCBjb2xsZWN0aW9uIClcbntcbiAgICBmb3IgKCBsZXQgW2l0ZW0sIGldIG9mIGVudW1lcmF0ZSggY29sbGVjdGlvbiApIClcbiAgICB7XG4gICAgICAgIGlmICggcHJlZGljYXRlKCBpdGVtLCBpICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBpdGVtO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0KCBjb2xsZWN0aW9uIClcbntcbiAgICBmb3IgKCBsZXQgaXRlbSBvZiBjb2xsZWN0aW9uIClcbiAgICB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3QoIGNvbGxlY3Rpb24gKVxue1xuICAgIGxldCBpdGVtO1xuICAgIGZvciAoIGl0ZW0gb2YgY29sbGVjdGlvbiApXG4gICAge1xuICAgICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhY3QoIGNvbGxlY3Rpb24gKVxue1xuICAgIHJldHVybiBmaWx0ZXIoIGlkZW50aXR5LCBjb2xsZWN0aW9uICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqc2VxdWVuY2UoIGJlZ2luPTAsIG1heD1JbmZpbml0eSwgc3RlcD0xIClcbntcbiAgICBmb3IgKCBsZXQgaSA9IGJlZ2luOyBpIDwgbWF4OyBpICs9IHN0ZXAgKVxuICAgIHtcbiAgICAgICAgeWllbGQgaTtcbiAgICB9XG59XG4iXX0=
