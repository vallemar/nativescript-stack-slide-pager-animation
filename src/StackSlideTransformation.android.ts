import {Utils} from "@nativescript/core";

@NativeClass
@Interfaces([androidx.viewpager2.widget.ViewPager2.PageTransformer])
export default class StackSlideTransformation extends java.lang.Object implements androidx.viewpager2.widget.ViewPager2.PageTransformer {
    DEFAULT_TRANSLATION_X = .0
    DEFAULT_TRANSLATION_FACTOR = 1.2
    SCALE_FACTOR = 0.30
    DEFAULT_SCALE = 1
    ALPHA_FACTOR = .3
    DEFAULT_ALPHA = 1
    offscreenPageLimit = 3

    transformPage(page: android.view.View, position: any) {
        const viewPager = page.getParent().getParent() as androidx.viewpager2.widget.ViewPager2
        viewPager.setOffscreenPageLimit(4);
        viewPager.setClipToPadding(false);
        viewPager.setClipChildren(false);
        androidx.core.view.ViewCompat.setElevation(page, -Math.abs(position))

        const translate= 120
        const staleFactor = 0.30
        const scale = 1 - (staleFactor * Math.abs(position) )
        const pageTranslationX = Utils.layout.toDevicePixels(translate);

        page.setTranslationX(-(pageTranslationX ) * position)
        page.setScaleY(scale)
        page.setScaleX(scale)

    }
}

/*@NativeClass
@Interfaces([androidx.viewpager2.widget.ViewPager2.PageTransformer])
export default class StackSlideTransformation extends java.lang.Object implements androidx.viewpager2.widget.ViewPager2.PageTransformer {
    DEFAULT_TRANSLATION_X = .0
    DEFAULT_TRANSLATION_FACTOR = 1.2
    SCALE_FACTOR = .14
    DEFAULT_SCALE = 1
    ALPHA_FACTOR = .3
    DEFAULT_ALPHA = 1
    offscreenPageLimit = 3

    transformPage(page: android.view.View, position: any) {
        androidx.core.view.ViewCompat.setElevation(page, -Math.abs(position))
        const scaleFactor = -this.SCALE_FACTOR * position + this.DEFAULT_SCALE
        const alphaFactor = -this.ALPHA_FACTOR * position + this.DEFAULT_ALPHA

        if (position <= 0) {
            page.setTranslationX(this.DEFAULT_TRANSLATION_X);
            page.setScaleX(this.DEFAULT_SCALE);
            page.setScaleY(this.DEFAULT_SCALE);
            page.setAlpha(this.DEFAULT_ALPHA + position);
        } else if (position <= this.offscreenPageLimit - 1) {
            page.setScaleX(scaleFactor);
            page.setScaleY(scaleFactor);
            page.setTranslationX(-(page.getWidth() / this.DEFAULT_TRANSLATION_FACTOR) * position);
            page.setAlpha(alphaFactor);
        } else {
            page.setTranslationX(this.DEFAULT_TRANSLATION_X);
            page.setScaleX(this.DEFAULT_SCALE);
            page.setScaleY(this.DEFAULT_SCALE);
            page.setAlpha(this.DEFAULT_ALPHA);
        }
    }
}*/


/*export class StackSlideTransformation  {

}*/
