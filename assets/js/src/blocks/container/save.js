import BlockBody from './block-body';

const {
	useBlockProps
} = wp.blockEditor;

const Save = ( props ) => {

	const blockProps = useBlockProps.save();

	const {
		className,
		attributes
	} = props;

	return <BlockBody
		attributes={ attributes }
		blockProps={ blockProps }
		isEdit={ false }
		className={ className }
	/>;
}

export default Save;
