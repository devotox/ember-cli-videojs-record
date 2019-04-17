import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | videojs-record', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{videojs-record}}`);

	const content = 'DeviceVideo Player is loading.Play';

    assert.ok(this.element.textContent.trim().includes(content));

    // Template block usage:
    await render(hbs`
      {{#videojs-record}}
        template block text
      {{/videojs-record}}
    `);

    assert.ok(this.element.textContent.trim().includes(content));
  });
});
