import Route from '@ember/routing/route';

export default Route.extend({

	setupController(controller) {
		controller.set('maxLength', 3);

		controller.set('pip', true);
		controller.set('audio', true);
		controller.set('video', true);

		controller.set('image', false);
		controller.set('screen', false);
		controller.set('animation', false);
	},

	actions: {
		onFinished(player, media) {
			console.log(player, media); // eslint-disable-line
		}
	}
});
