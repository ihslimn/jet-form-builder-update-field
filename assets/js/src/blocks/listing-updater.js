// Import necessary components from WordPress
const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;
const { createElement } = wp.element;

function registerListingUpdater() {

    registerBlockType('jfb-update-field/listing-updater', {
        title: 'Listing Updater',
        icon: 'update',
        category: 'jet-form-builder-elements',
        description: "Use this block to update a listing upon field value change.",
        attributes: {
            listingIds: {
                type: 'string',
                default: '',
            },
            fieldsToListen: {
                type: 'string',
                default: '',
            },
        },
        edit: function (props) {
    
            return (
                <>
                    <div>
                        <TextControl
                            label="Listing IDs"
                            value={props.attributes.listingIds}
                            onChange={(newListingIds) => {
                                props.setAttributes({ listingIds: newListingIds });
                            }}
                        />
                        <TextControl
                            label="Fields to listen"
                            value={props.attributes.fieldsToListen}
                            onChange={(newfieldsToListen) => {
                                props.setAttributes({ fieldsToListen: newfieldsToListen });
                            }}
                        />
                    </div>
                </>
            );
        },
        save: function (props) {
            return <div class="jfbuf-listing-updater" data-listing-ids={props.attributes.listingIds} data-fields-to-listen={props.attributes.fieldsToListen}></div>;
        },
    });

}

export default registerListingUpdater;
