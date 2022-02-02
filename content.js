console.log('youtube ad skipper on')

const vidSelectors = ['.video-stream']
const ad_selectors = ['.ytp-ad-image']
const ad_click = ['.ytp-ad-skip-button ']
const ad_overlay = ['.ytp-ad-overlay-close-button']
const skip = () => {
    try {
        let vid = document.querySelectorAll(vidSelectors.join(', '))
        let is_ad_click = document.querySelector(ad_click.join(', '))
        let is_ad_overlay = document.querySelector(ad_overlay.join(', '))
        if (is_ad_click) {
            is_ad_click.click()
            console.log('ad disabled')
        }
        setTimeout(() => {
            let is_ad = document.querySelector(ad_selectors.join(', '))
            if (is_ad)
                for (let i = 0; i < vid.length; i++) {
                    vid[i].currentTime = 55555
                    setTimeout(() => {
                        is_ad_click.click()
                        console.log('ad forwarded and clicked')
                    }, 100)
                }
        }, 50)

        if (is_ad_overlay) {
            is_ad_overlay.click()
            console.log('ad overlay disabled')
        }
    } catch (error) {

    }
    setTimeout(skip, 200)
}
skip()