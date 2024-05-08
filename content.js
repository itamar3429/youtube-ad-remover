console.log("youtube ad skipper on");

class YoutubeSkipper {
  constructor() {
    this.vidSelectors = [".video-stream"];
    this.adSelectors = [".ytp-ad-image", ".ytp-ad-preview-container", '.ytp-ad-player-overlay-layout'];
    this.adClick = [".ytp-ad-skip-button", ".ytp-ad-skip-button-modern", '.ytp-skip-ad-button'];
    this.adOverlay = [".ytp-ad-overlay-close-button"];
    this.contentWarningButton = [
      "#button.yt-player-error-message-renderer button",
    ];
    this.lastSkippedContentWarning = 0;
  }

  async wait(ms) {
    return new Promise((res, rej) => {
      setTimeout(() => res(), ms);
    });
  }

  async start() {
    try {
      await this.skipAd();
      await this.skipAdOverlay();
      await this.skipContentWarning();
    } catch (error) {}
    await this.wait(200);
    this.start();
  }

  async clickSkipAdButton() {
    let is_ad_click = document.querySelector(this.adClick.join(", "));
    if (is_ad_click) {
      is_ad_click.click();
      console.log("ad disabled");
      await this.wait(200);
    }
  }

  async skipAd() {
    let vid = document.querySelectorAll(this.vidSelectors.join(", "));
    this.clickSkipAdButton();
    this.wait(100);
    let is_ad = document.querySelector(this.adSelectors.join(", "));
    if (is_ad)
      for (let i = 0; i < vid.length; i++) {
        vid[i].currentTime = 55555;
        await this.wait(100);
        this.clickSkipAdButton();
      }
  }

  async skipAdOverlay() {
    let is_ad_overlay = document.querySelector(this.adOverlay.join(", "));

    if (is_ad_overlay) {
      is_ad_overlay.click();
      console.log("ad overlay disabled");
      await this.wait(200);
    }
  }

  async skipContentWarning() {
    let is_content_warning = document.querySelector(
      this.contentWarningButton.join(", ")
    );

    if (
      is_content_warning &&
      Date.now() - this.lastSkippedContentWarning > 5 * 1000
    ) {
      is_content_warning.click();
      console.log("content warning skipped");
      this.lastSkippedContentWarning = Date.now();
    }
  }
}

new YoutubeSkipper().start();
