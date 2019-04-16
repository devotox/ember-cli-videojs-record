'use strict';

const { name } = require('./package');

module.exports = {
	name,

	included() {
		Reflect.apply(this._super.included, this, arguments);
		this._ensureThisImport();

		this.import('node_modules/video.js/dist/video-js.css');
		this.import('node_modules/videojs-wavesurfer/dist/css/videojs.wavesurfer.css');
		this.import('node_modules/videojs-record/dist/css/videojs.record.css');

		this.import('node_modules/video.js/dist/video.js');
		this.import('node_modules/recordrtc/RecordRTC.js');
		this.import('node_modules/webrtc-adapter/out/adapter.js');

		this.import('node_modules/wavesurfer.js/dist/wavesurfer.js');
		this.import('node_modules/wavesurfer.js/dist/plugin/wavesurfer.microphone.js');
		this.import('node_modules/videojs-wavesurfer/dist/videojs.wavesurfer.js');

		this.import('node_modules/videojs-record/dist/videojs.record.js');
		this.import('vendor/shims/videojs-record.js');
	},
	_ensureThisImport() {
		if (!this.import) {
			this._findHost = function findHostShim() {
				let current = this;
				let app;

				// eslint-disable-next-line
				do {
					app = current.app || app;
				} while (current.parent.parent && (current = current.parent));

				return app;
			};
			this.import = function importShim(asset, options) {
				const app = this._findHost();
				app.import(asset, options);
			};
		}
	}
};
