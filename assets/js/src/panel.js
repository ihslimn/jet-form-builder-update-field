const { PluginDocumentSettingPanel } = wp.editPost;
const {
    registerPlugin,
    getPlugin,
    unregisterPlugin,
} = wp.plugins;

const MyDocumentSettingTest = () => (
    <PluginDocumentSettingPanel
        className="my-document-setting-plugin"
        title="My Panel"
    >
        <p>My Document Setting Panel</p>
    </PluginDocumentSettingPanel>
);

registerPlugin( 'document-setting-test', { render: MyDocumentSettingTest } );