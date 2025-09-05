if (typeof QuickView === 'undefined') {
	const {FoxThemeStyles, FoxThemeScripts} = window
	class QuickView {
		constructor() {
			this.modal = null
			this.productHandle = ''

			addEventDelegate({
				selector: '[data-product-quickview]',
				handler: (e, target) => {
					e.preventDefault()
					this.target = target
					target.classList.add('btn--loading')
					this.productHandle = target.dataset.productQuickview
					if (this.productHandle) this.fetchHtml(this.productHandle)
				}
			})

			window.FoxThemeEvents.subscribe(`ON_ITEM_ADDED`, () => {
				if (this.modal) this.modal.hide()
			})
		}

		fetchHtml(productHandle) {
			loadAssets([FoxThemeStyles.product], 'quick-view-assets')
			fetchSection('product-quickview', {url: `${window.FoxThemeSettings.base_url}products/${productHandle}`}).then(html => {
				this.modal = html.querySelector('modal-dialog')
				const firstModel = html.querySelector('product-model')
				document.body.appendChild(this.modal)
				loadAssets([FoxThemeScripts.productMedia, FoxThemeScripts.variantsPicker], 'variants-picker', () => {
					this.modal && this.modal.show(this.target)
					if (this.mediaGallery) {
						const thumb = this.mediaGallery.querySelector('[id^="GalleryThumbnails"]')
						if (thumb) thumb.update()
						this.mediaGallery.update()
					}
					if (Shopify && Shopify.PaymentButton) {
						Shopify.PaymentButton.init()
					}
					this.target.classList.remove('btn--loading')
					this.handleClose()
					__reInitTooltip(this.modal);
				})
				if (firstModel) {
					loadAssets([FoxThemeScripts.productModel, 'https://cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css'], 'product-model-assets')
				}
			})
			.then(() => {
				if (document.getElementById('QuickView-Modal').dataset.productHandle !== this.productHandle) {
					[...document.querySelectorAll('.f-modal-quickview')].filter(modal => modal.dataset.productHandle !== this.productHandle)[0].remove();
				}
			})
			.catch(console.error)
		}

		handleClose() {
			if (!this.modal) return
			this.modal.addEventListener('close', () => {
				this.modal.remove()
			})
		}
	}
	new QuickView()
	window.QuickView = QuickView;
}
