[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-videojs-record.svg)](http://emberobserver.com/addons/ember-cli-videojs-record)
[![Build Status](https://travis-ci.org/devotox/ember-cli-videojs-record.svg)](http://travis-ci.org/devotox/ember-cli-videojs-record)
[![Coverage Status](https://codecov.io/gh/devotox/ember-cli-videojs-record/branch/master/graph/badge.svg)](https://codecov.io/gh/devotox/ember-cli-videojs-record)
[![NPM Version](https://badge.fury.io/js/ember-cli-videojs-record.svg)](http://badge.fury.io/js/ember-cli-videojs-record)
[![NPM Downloads](https://img.shields.io/npm/dm/ember-cli-videojs-record.svg)](https://www.npmjs.org/package/ember-cli-videojs-record)
[![Dependency Status](https://david-dm.org/devotox/ember-cli-videojs-record.svg)](https://david-dm.org/devotox/ember-cli-videojs-record)
[![DevDependency Status](https://david-dm.org/devotox/ember-cli-videojs-record/dev-status.svg)](https://david-dm.org/devotox/ember-cli-videojs-record#info=devDependencies)
[![Greenkeeper](https://badges.greenkeeper.io/devotox/ember-cli-videojs-record.svg)](https://greenkeeper.io/)

ember-cli-videojs-record
==============================================================================

Simple Wrapper around [VideoJS Record](https://github.com/collab-project/videojs-record).

This provides a service that can be used to record, play, and export video, audio, screenshare as a webm file, blob, or base64 string.

[DEMO](http://devotox.github.io/ember-cli-videojs-record)

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-videojs-record
```

Usage
------------------------------------------------------------------------------

```javascript
import Route from '@ember/routing/route';

export default Route.extend({
	actions: {
		onFinished(player, media) {
			console.log(player, media); // eslint-disable-line
		}
	}
});
```

```handlebars
{{videojs-record
  pip=pip
  audio=audio
  video=video
  image=image
  screen=screen
  animation=animation
  maxLength=maxLength
  onFinished=(route-action "onFinished")
}}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
