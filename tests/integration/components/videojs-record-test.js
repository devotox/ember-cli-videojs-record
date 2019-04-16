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

    const content = 'DeviceVideo Player is loading.Play VideoPlayMuteCurrent Time 0:00/Duration 0:00Loaded: 0%Stream Type LIVESeek to live, currently playing liveLIVERemaining Time -0:00 Playback Rate1xChaptersChaptersDescriptionsdescriptions off, selectedCaptionscaptions and subtitles off, selectedAudio TrackFullscreenThis is a modal window.Beginning of dialog window. Escape will cancel and close the window.TextColorWhiteBlackRedGreenBlueYellowMagentaCyanTransparencyOpaqueSemi-TransparentBackgroundColorBlackWhiteRedGreenBlueYellowMagentaCyanTransparencyOpaqueSemi-TransparentTransparentWindowColorBlackWhiteRedGreenBlueYellowMagentaCyanTransparencyTransparentSemi-TransparentOpaqueFont Size50%75%100%125%150%175%200%300%400%Text Edge StyleNoneRaisedDepressedUniformDropshadowFont FamilyProportional Sans-SerifMonospace Sans-SerifProportional SerifMonospace SerifCasualScriptSmall CapsReset restore all settings to the default valuesDoneClose Modal DialogEnd of dialog window.';

    assert.equal(this.element.textContent.trim(), content);

    // Template block usage:
    await render(hbs`
      {{#videojs-record}}
        template block text
      {{/videojs-record}}
    `);

    assert.equal(this.element.textContent.trim(), content);
  });
});
