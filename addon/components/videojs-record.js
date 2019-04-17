import videojs from 'videojs-record';

import { once } from '@ember/runloop';

import Component from '@ember/component';

import { computed, observer } from '@ember/object';

import layout from '../templates/components/videojs-record';

const {
	URL,
	Blob,
	Promise,
	document,
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
	},
	isDataURI(dataURI) {
		let regex = /^\s*data:([a-z]+\/[a-z0-9\-+]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@/?%\s]*\s*$/i;
		return dataURI && typeof dataURI === 'string' &&  !!dataURI.match(regex);
	}
};

const optionsToChange = [
	'pip',
	'audio',
	'video',
	'image',
	'screen',
	'animation',
	'maxLength'
];

export default Component.extend({
	layout,

	maxLength: 5,

	saveAs: false,

	src: undefined,

	srcType: 'video/webm',

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


	_shouldChangeOptions: observer(...optionsToChange, function() {// eslint-disable-line
		this.destroy();

		this.create();

		once(this, 'didInsertElement');
	}),

	options: computed(...optionsToChange, function() {
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

	onDestroy() { },

	onFinished() { },

	setEvents() {
		const player = this.get('player');

		player.on('finishRecord', async() => {
			const media = await this.getMedia();
			this.onFinished(player, media);

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

		if (crypto.isDataURI(blob)) {
			return { base64: blob };
		}

		let mediaURL = crypto.createURL(blob);

		return crypto.fromBlob(blob, 'data')
			.then((base64) => ({ blob, base64, mediaURL }));

	},

	create() {
		let s = this.get('src');
		let $media = document.createElement('video');
		let $source = document.createElement('source');

		$source.src = this.get('src');
		$source.type = this.get('srcType');
		$media.className = 'video-js vjs-default-skin';

		s && $media.appendChild($source);
		this.element.appendChild($media);
	},

	reset() {
		let player = this.get('player');

		try {
			player.record().reset();
		} catch(e) {
			// eslint-disable-line
		}

		return player;
	},

	destroy() {
		let player = this.get('player');

		try {
			player.record().destroy();
		} catch(e) {
			// eslint-disable-line
		}

		return player;
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

		const player = this.destroy();

		this.onDestroy(player);
	},

});
