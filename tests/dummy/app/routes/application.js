import Route from '@ember/routing/route';

export default Route.extend({

	actions: {
		onFinished(player, media) {
			console.log(player, media); // eslint-disable-line
		}
	}
});
