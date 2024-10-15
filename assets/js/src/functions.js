import {
	SUPPORTED_BLOCKS,
	OPTIONS_LISTENER_ENABLED,
	VALUE_LISTENER_ENABLED,
} from './constants';

function isUpdaterEnabled( props, needSupportType = '' ) {
	const blockName = props.name;

	if ( ! blockName ) {
		return false;
	}
	const supportType = SUPPORTED_BLOCKS[ blockName ] || false;

	if ( ! supportType ) {
		return false;
	}

	if ( needSupportType && supportType !== needSupportType ) {
		return false;
	}

	const attributes = props?.attributes;

	if ( ! attributes ) {
		return false;
	}

	return ( attributes[ OPTIONS_LISTENER_ENABLED ] && supportType === 'options' )
	         || 
		   ( attributes[ VALUE_LISTENER_ENABLED ] && supportType === 'value' );
}

export {
	isUpdaterEnabled
};
