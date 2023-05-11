export function isObject(x) {
	return typeof x === 'object' && x !== null;
};

export function notObject(x) {
	return !isObject(x);
};

export function objectSlice(obj, key) {
	if (!obj.hasOwnProperty(key))
		return false;

	const keyValue = obj[key];
	delete obj[key];

	return keyValue;
};

export function clone(o) {
	let output, v, key;

	output = Array.isArray(o) ? [] : {};

	for (key in o) {
		v = o[key];
		output[key] = (typeof v === "object") ? clone(v) : v;
	}

	return output;
}

export function arrayMove(arr, startIndex, endIndex) {
	while (startIndex < 0) {
		startIndex += arr.length;
	}
	while (endIndex < 0) {
		endIndex += arr.length;
	}
	if (endIndex >= arr.length) {
		var k = endIndex - arr.length + 1;
		while (k--) {
			arr.push(undefined);
		}
	}

	arr.splice(endIndex, 0, arr.splice(startIndex, 1)[0]);

	return arr;
};

export function arrayRemoveByValue(array, val) {
	let index = array.indexOf(val);

	if (index > -1) {
		array.splice(index, 1);
	}
}

export function arrayRemoveObjectByKey(array, key, val) {
	let index = array.findIndex(o => o[key] === val);

	if (index > -1) {
		array.splice(index, 1);
	}

	return array;
}

export function mergeData() {
	const args = [...arguments];

	if (!args.length)
		return false;

	if (args.length === 1)
		return args[0];

	let outputData = [];

	args.forEach(arg => {
		outputData = outputData.concat(arg);
	});

	return [...new Set(outputData)];
}

export function isNotEmpty(obj) {
	switch (obj.constructor) {
		case Object:
			return Object.entries(obj).length ? true : false;
		case Array:
			return obj.length ? true : false;
	}

	return obj ? true : false;
}

export function isEmpty(obj) {
	return !isNotEmpty(obj);
}

export function someIsTrue(arr) {
	return arr.some(item => {
		return Boolean(item);
	});
}

export function someIsFalse(arr) {
	return arr.some(item => {
		return !Boolean(item);
	});
}

export function allTrue(arr) {
	return someIsFalse(arr) ? false : true;
}

export function isValidUrl(string) {
	try {
		new URL(string);
	} catch (_) {
		return false;
	}

	return true;
}

export function isFunction(variableToCheck) {
	return variableToCheck instanceof Function ? true : false;
}

export function isNestingExist(obj) {
	const nesting = Array.from(arguments).splice(1);
	let output = true;

	for (let key of nesting) {
		if (!obj[key]) {
			output = false
			break;
		}

		obj = obj[key];
	}

	return output;
}

export function getNesting(obj) {
	const nesting = Array.from(arguments).splice(1);
	let isNestingExist = true;

	for (let key of nesting) {
		if (!obj[key]) {
			isNestingExist = false
			break;
		}

		obj = obj[key];
	}

	return isNestingExist ? obj : false;
}

export function isEqual(value, other) {
	let type = Object.prototype.toString.call(value);

	if (type !== Object.prototype.toString.call(other)) {
		return false;
	}

	if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
		return false;
	}

	let valueLen = type === '[object Array]' ? value.length : Object.keys(value).length,
		otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;

	if (valueLen !== otherLen) {
		return false;
	}

	let compare = function (item1, item2) {
		let itemType = Object.prototype.toString.call(item1);

		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!isEqual(item1, item2)) {
				return false;
			}
		} else {
			if (itemType !== Object.prototype.toString.call(item2)) {
				return false;
			}

			if (itemType === '[object Function]') {
				if (item1.toString() !== item2.toString()) {
					return false;
				}
			} else {
				if (item1 !== item2) {
					return false;
				}
			}
		}
	};

	if (type === '[object Array]') {
		for (let i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) {
				return false;
			}
		}
	} else {
		for (let key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) {
					return false;
				}
			}
		}
	}

	return true;
};

export function getUrlParams() {
	const search = decodeURIComponent(window.location.search),
		hashes = search.slice(search.indexOf('?') + 1).split('&'),
		params = {};

	hashes.map(hash => {
		const [key, val] = hash.split('=');
		params[key] = val;
	})

	return params;
}

export function getProviderFilters(provider, queryId = 'default') {
	return getNesting(JetSmartFilters, 'filterGroups', provider + '/' + queryId, 'filters') || [];
}

export function getCallbackArgs( arg ) {

	if ( ! window.JetEngineListingData.filterCallbacksArgs ) {
		return [];
	}

	const result = [];

	for ( var i = 0; i < window.JetEngineListingData.filterCallbacksArgs.length; i++ ) {

		var control = window.JetEngineListingData.filterCallbacksArgs[ i ];

		if ( ! control.condition ) {
			continue;
		}

		if ( Array.isArray( control.condition ) && ! control.condition.includes( arg ) ) {
			continue;
		}

		if ( ! Array.isArray( control.condition ) && control.condition !== arg ) {
			continue;
		}

		control.name = control.prop;
		result.push( control );

	}

	return result;

}

export function getGradientValueBySlug( gradients, slug ) {

	const {
		find
	} = window.lodash;

	const gradient = find( gradients, [ 'slug', slug ] );
	return gradient && gradient.gradient;
}

export function getGradientSlugByValue( gradients, value ) {

	const {
		find
	} = window.lodash;

	const gradient = find( gradients, [ 'gradient', value ] );
	return gradient && gradient.slug;
}

export function getColorObjectByColorValue( colors, colorValue ) {

	const {
		find
	} = window.lodash;

	return find( colors, { color: colorValue } );
}

export function getColorObjectByAttributeValues( colors, definedColor, customColor ) {

	const {
		find
	} = window.lodash;

	if ( definedColor ) {
		const colorObj = find( colors, { slug: definedColor } );

		if ( colorObj ) {
			return colorObj;
		}
	}

	return {
		color: customColor,
	};

};

export function getClassWithContext( value, context ) {

	if ( ! context || ! value ) {
		return null;
	}

	return 'has-' + value + '-' + context;

}

export default {
	isObject,
	notObject,
	objectSlice,
	clone,
	arrayMove,
	arrayRemoveByValue,
	arrayRemoveObjectByKey,
	mergeData,
	isNotEmpty,
	isEmpty,
	isEqual,
	someIsTrue,
	someIsFalse,
	allTrue,
	isValidUrl,
	isFunction,
	isNestingExist,
	getNesting,
	getUrlParams,
	getProviderFilters,
	getCallbackArgs,
	getGradientValueBySlug,
	getGradientSlugByValue,
	getColorObjectByColorValue,
	getColorObjectByAttributeValues,
	getClassWithContext
}
