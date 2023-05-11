import {
	clone,
	arrayMove
} from '../utils/utility';

const {
	G,
	Path,
	Circle,
	Rect,
	SVG
} = wp.components;

class JetEngineRepeater extends React.Component {
	moveDown(startIndex) {
		const data = [ ...this.props.data ],
			endIndex = startIndex + 1;

		if (!data.length || endIndex >= data.length)
			return;

		this.props.onChange(arrayMove(data, startIndex, endIndex));
	}

	moveUp(startIndex) {
		const data = [ ...this.props.data ],
			endIndex = startIndex - 1;

		if (!data.length || endIndex < 0)
			return;

		this.props.onChange(arrayMove(data, startIndex, endIndex));
	}

	remove(index) {
		const data = [ ...this.props.data ];

		if ( ! data.length ) {
			return;
		}

		data.splice( index, 1 );

		this.props.onChange(data);
	}

	addNew() {
		const data = [ ...this.props.data ];

		data.push(this.props.default);
		this.props.onChange(data);

	}

	render() {
		const {
			data,
			indexPrefix = 'key',
			children,
		} = this.props;

		return (
			<div className='je-repeater'>
				{data.map((itemData, index) => {

					const item = React.cloneElement(children(itemData, index), { key: `${indexPrefix}-${index}` });

					return (
						<div className='je-repeater-item' key={ 'repeater-item-' + index }>
							<div className='je-repeater-item-tools'>
								<div className="je-repeater-item-move">
									<div className='je-repeater-item-move-down je-repeater-item-tools-action'
										onClick={() => this.moveDown(index)}
									><SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><Rect x="0" fill="none" width="20" height="20"/><G><Path d="M15 8l-4.03 6L7 8h8z"/></G></SVG></div>
									<div className='je-repeater-item-move-up je-repeater-item-tools-action'
										onClick={() => this.moveUp(index)}
									><SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><Rect x="0" fill="none" width="20" height="20"/><G><Path d="M11 7l-4 6h8"/></G></SVG></div>
								</div>
								<div className='je-repeater-item-remove je-repeater-item-tools-action'
									onClick={() => this.remove(index)}
								><SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><Rect x="0" fill="none" width="20" height="20"/><G><Path d="M12 4h3c.6 0 1 .4 1 1v1H3V5c0-.6.5-1 1-1h3c.2-1.1 1.3-2 2.5-2s2.3.9 2.5 2zM8 4h3c-.2-.6-.9-1-1.5-1S8.2 3.4 8 4zM4 7h11l-.9 10.1c0 .5-.5.9-1 .9H5.9c-.5 0-.9-.4-1-.9L4 7z"/></G></SVG></div>
							</div>
							<div className='je-repeater-item-content'>
								{item}
							</div>
						</div>
					);
				})}
				<div className='je-repeater-add-new'
					onClick={() => this.addNew()}
				>
					<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><Rect x="0" fill="none" width="20" height="20"/><G><Path d="M15.8 4.2c3.2 3.21 3.2 8.39 0 11.6-3.21 3.2-8.39 3.2-11.6 0C1 12.59 1 7.41 4.2 4.2 7.41 1 12.59 1 15.8 4.2zm-4.3 11.3v-4h4v-3h-4v-4h-3v4h-4v3h4v4h3z"/></G></SVG>
					<span>Add new item</span>
				</div>
			</div>
		);
	}
}

window.JetEngineBlocksComponents = window.JetEngineBlocksComponents || {};
window.JetEngineBlocksComponents.RepeaterControl = JetEngineRepeater;

export default JetEngineRepeater;
