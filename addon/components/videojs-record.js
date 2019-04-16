import videojs from 'videojs-record';

import { once } from '@ember/runloop';

import Component from '@ember/component';

import { computed, observer } from '@ember/object';

import layout from '../templates/components/videojs-record';

const {
	URL,
	Blob,
	Promise,
	FileReader
} = window;


const crypto = {
	exists(value) {
		return value !== null && typeof value !== 'undefined';
	},
	createURL(blob) {
		return URL.createObjectURL(blob);
	},
	fromBlob(blob, type = 'text') {
		let func = type === 'data' ? 'readAsDataURL' : 'readAsText';

		return new Promise((resolve, reject) => {
			let reader = new FileReader();

			reader[func](blob);
			reader.onerror = (error) => reject(error);
			reader.onload = () => resolve(reader.result);
		});
	},
	toBlob(dataURI) {
		let { buffer, mimeString } = this.toArrayBuffer(dataURI);

		// write the ArrayBuffer to a blob, and you're done
		return new Blob([buffer], { type: mimeString });
	}
};


export default Component.extend({
	layout,

	saveAs: false,

	overrideOptions(obj, prefix) {
		Object.keys(obj)
			.forEach((key) => {
				let value = !prefix
					? this.get(key)
					: this.get(`${prefix}.${key}`);

				crypto.exists(value)
					&& (obj[key] = value);
			});

		return obj;
	},

	options: computed(function() {
		const wavesurfer = this.overrideOptions({
			src: 'live',
			debug: false,
			cursorWidth: 1,
			msDisplayMax: 20,
			hideScrollbar: false,
			waveColor: '#36393b',
			progressColor: 'white'
		}, 'wavesurfer');

		const record = this.overrideOptions({
			pip: true,
			debug: false,
			maxLength: 5,
			hotKeys: false,
			frameWidth: 1920,
			frameHeight: 1080,

			audio: true,
			video: true,

			image: false,
			screen: false,
			animation: false,
		});

		const options = {
			width: 640,
			height: 360,

			loop: true,
			fluid: true,
			controls: true,

			plugins: { record }
		};

		record.audio
			&& !record.video
			&& (options.plugins.wavesurfer = wavesurfer);

		return options;
	}),

	onInit() { },

	onChange() { },

	onDestroy() { },

	setEvents() {
		const player = this.get('player');

		player.on('finishRecord', async() => {
			const media = await this.getMedia();
			this.onChange(player, media);

			let saveAs = this.get('saveAs');

			saveAs === true
				&& (saveAs = 'video.webm');

			saveAs
				&& player.record()
					.saveAs({ video: saveAs });
		});
	},

	getMedia() {
		const player = this.get('player');
		const blob = player.recordedData;
		let mediaURL = crypto.createURL(blob);

		return crypto.fromBlob(blob, 'data')
			.then((base64) => ({ blob, base64, mediaURL }));

	},

	didInsertElement() {
		const options = this.get('options');

		const field = this.element.querySelector('video, audio');

		const player = videojs(field, options);

		this.set('player', player);

		this.onInit(player);

		this.setEvents();

	},

	willDestroyElement() {
		if (this.isDestroyed || this.isDestroying) { return; }

		this._super(...arguments);

		let player = this.get('player');

		player && player.record().destroy();

		this.onDestroy(player);
	},

	_shouldChange: observer( // eslint-disable-line
		'maxLength',
		function() {
			let player = this.get('player');

			player && player.record().destroy();

			once(this, 'didInsertElement');
		}
	)

});
