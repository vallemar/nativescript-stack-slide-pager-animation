import {Pager} from "@nativescript-community/ui-pager";

let applyAnimation = false
export default function (i: number, uiCollectionViewLayoutAttributes: UICollectionViewLayoutAttributes, owner: Pager, collectionView: UICollectionView) {


    const animation = new PageAttributesAnimator(
        new PagerAnimation(i, uiCollectionViewLayoutAttributes, owner, collectionView)
    )
    animation.animate()

}


class AnimatedCollectionViewLayoutAttributes {
    contentView: UIView = null!
    scrollDirection = UICollectionViewScrollDirection.Horizontal

    /// The ratio of the distance between the start of the cell and the start of the collectionView and the height/width of the cell depending on the scrollDirection. It's 0 when the start of the cell aligns the start of the collectionView. It gets positive when the cell moves towards the scrolling direction (right/down) while getting negative when moves opposite.
    startOffset = 2

    /// The ratio of the distance between the center of the cell and the center of the collectionView and the height/width of the cell depending on the scrollDirection. It's 0 when the center of the cell aligns the center of the collectionView. It gets positive when the cell moves towards the scrolling direction (right/down) while getting negative when moves opposite.
    middleOffset = 0

    /// The ratio of the distance between the **start** of the cell and the end of the collectionView and the height/width of the cell depending on the scrollDirection. It's 0 when the **start** of the cell aligns the end of the collectionView. It gets positive when the cell moves towards the scrolling direction (right/down) while getting negative when moves opposite.
    endOffset = 0

    attributes: UICollectionViewLayoutAttributes = null!

    constructor(scrollDirection: UICollectionViewScrollDirection, attributes: UICollectionViewLayoutAttributes) {
        this.scrollDirection = scrollDirection;
        this.attributes = attributes;
    }
}


class PagerAnimation {
    uiCollectionViewLayoutAttributes: UICollectionViewLayoutAttributes;
    owner: Pager;
    collectionView: UICollectionView;
    animatedAttributes: AnimatedCollectionViewLayoutAttributes;

    constructor(i: number, uiCollectionViewLayoutAttributes: UICollectionViewLayoutAttributes, owner: Pager, collectionView: UICollectionView) {
        this.uiCollectionViewLayoutAttributes = uiCollectionViewLayoutAttributes;
        this.owner = owner;
        this.collectionView = collectionView;
        const scrollDirection = owner.orientation === "horizontal" ? UICollectionViewScrollDirection.Horizontal : UICollectionViewScrollDirection.Vertical


        const attributes = new AnimatedCollectionViewLayoutAttributes(scrollDirection, uiCollectionViewLayoutAttributes)
        this.animatedAttributes = attributes;
        let a = attributes

        let distance: any
        let itemOffset: any

        if (attributes.scrollDirection == UICollectionViewScrollDirection.Horizontal) {

            distance = collectionView.frame.size.width;
            itemOffset = uiCollectionViewLayoutAttributes.center.x - collectionView.contentOffset.x
            a.startOffset = (uiCollectionViewLayoutAttributes.frame.origin.x - collectionView.contentOffset.x) / uiCollectionViewLayoutAttributes.frame.size.width
            a.endOffset = (uiCollectionViewLayoutAttributes.frame.origin.x - collectionView.contentOffset.x - collectionView.frame.size.width) / uiCollectionViewLayoutAttributes.frame.size.width
        } else {

            distance = collectionView.frame.size.height
            itemOffset = uiCollectionViewLayoutAttributes.center.y - collectionView.contentOffset.y
            a.startOffset = (uiCollectionViewLayoutAttributes.frame.origin.y - collectionView.contentOffset.y) / uiCollectionViewLayoutAttributes.frame.size.height
            a.endOffset = (uiCollectionViewLayoutAttributes.frame.origin.y - collectionView.contentOffset.y - collectionView.frame.size.height) / uiCollectionViewLayoutAttributes.frame.size.height
        }

        a.scrollDirection = attributes.scrollDirection
        a.middleOffset = itemOffset / distance - 0.5

        // Cache the contentView since we're going to use it a lot.
        if (a.contentView == null) {
            let c = collectionView.cellForItemAtIndexPath(uiCollectionViewLayoutAttributes.indexPath)?.contentView;
            a.contentView = c
        }
    }

}


class LinearCardAttributesAnimator {
    /// The alpha to apply on the cells that are away from the center. Should be
    /// in range [0, 1]. 0.5 by default.
    minAlpha = 0.5;
    /// The spacing ratio between two cells. 0.4 by default.
    itemSpacing = 0.3;
    /// The scale rate that will applied to the cells to make it into a card.
    scaleRate = 0.7;
    pagerAnimation: PagerAnimation = null!;

    constructor(pagerAnimation: PagerAnimation) {
        this.pagerAnimation = pagerAnimation;
    }

    init(minAlpha = 0.5, itemSpacing = 0.4, scaleRate = 0.7) {
        this.minAlpha = minAlpha
        this.itemSpacing = itemSpacing
        this.scaleRate = scaleRate
    }

    animate() {
        let position = this.pagerAnimation.animatedAttributes.middleOffset
        let scaleFactor = this.scaleRate - 0.1 * Math.abs(position)
        let scaleTransform = CGAffineTransformMakeScale(scaleFactor, scaleFactor);
        let translationTransform: CGAffineTransform

        if (this.pagerAnimation.animatedAttributes.scrollDirection == UICollectionViewScrollDirection.Horizontal) {

            let width = this.pagerAnimation.collectionView.frame.size.width
            let translationX = -(width * this.itemSpacing * position)
            translationTransform = CGAffineTransformMakeTranslation(translationX, 0)
        } else {
            let height = this.pagerAnimation.collectionView.frame.size.height
            let translationY = -(height * this.itemSpacing * position)
            translationTransform = CGAffineTransformMakeTranslation(0, translationY)
        }

        this.pagerAnimation.uiCollectionViewLayoutAttributes.alpha = 1.0 - Math.abs(position) + this.minAlpha
        this.pagerAnimation.uiCollectionViewLayoutAttributes.transform = CGAffineTransformConcat(scaleTransform, translationTransform);
    }
}

class CubeAttributesAnimator {
    /// The alpha to apply on the cells that are away from the center. Should be
    /// in range [0, 1]. 0.5 by default.
    perspective = -1 / 500;
    /// The spacing ratio between two cells. 0.4 by default.
    totalAngle = Math.PI / 2;
    /// The scale rate that will applied to the cells to make it into a card.

    pagerAnimation: PagerAnimation = null!;

    constructor(pagerAnimation: PagerAnimation) {
        this.pagerAnimation = pagerAnimation;
    }


    animate() {
        let position = this.pagerAnimation.animatedAttributes.middleOffset


        let contentView = this.pagerAnimation.animatedAttributes.contentView
        if (!contentView) return
        if (Math.abs(position) >= 1) {
            contentView.layer.transform = CATransform3DIdentity
            contentView.layer.anchorPoint = CGPointMake(0.5, 0.5)
        } else if (this.pagerAnimation.animatedAttributes.scrollDirection == UICollectionViewScrollDirection.Horizontal) {
            let rotateAngle = this.totalAngle * position

            let anchorPoint = CGPointMake(position > 0 ? 0 : 1, 0.5)

            // As soon as we changed anchor point, we'll need to either update frame/position
            // or transform to offset the position change. frame doesn't work for iOS 14 any
            // more so we'll use transform.
            let anchorPointOffsetValue = this.pagerAnimation.collectionView.layer.bounds.size.width / 2
            let anchorPointOffset = position > 0 ? -anchorPointOffsetValue : anchorPointOffsetValue

            var transform = CATransform3DMakeTranslation(anchorPointOffset, 0, 0)
            transform.m34 = this.perspective
            transform = CATransform3DRotate(transform, rotateAngle, 0, 1, 0)

            contentView.layer.transform = transform
            contentView.layer.anchorPoint = anchorPoint

            // As soon as we changed anchor point, we'll need to either update frame/position
            // or transform to offset the position change. frame doesn't work for iOS 14 any
            // more so we'll use transform.
        }
    }
}

class PageAttributesAnimator {
    /// The max scale that would be applied to the current cell. 0 means no scale. 0.2 by default.
    scaleRate = 0.5;


    pagerAnimation: PagerAnimation = null!;

    constructor(pagerAnimation: PagerAnimation) {
        this.pagerAnimation = pagerAnimation;
    }


    animate() {
        let position = this.pagerAnimation.animatedAttributes.middleOffset

        let contentOffset = this.pagerAnimation.collectionView.contentOffset
        let itemOrigin = this.pagerAnimation.animatedAttributes.attributes.frame.origin
        let scaleFactor = this.scaleRate * Math.min(position, 0) + 1.0
        let transform = CGAffineTransformMakeScale(scaleFactor, scaleFactor)

        if (this.pagerAnimation.animatedAttributes.scrollDirection == UICollectionViewScrollDirection.Horizontal) {
            transform = CGAffineTransformConcat(transform, CGAffineTransformMakeTranslation(position < 0 ? contentOffset.x - itemOrigin.x : 0, 0))
        } else {
            transform = CGAffineTransformConcat(transform, CGAffineTransformMakeTranslation(0, position < 0 ? contentOffset.y - itemOrigin.y : 0))
        }

        this.pagerAnimation.uiCollectionViewLayoutAttributes.transform = transform
        this.pagerAnimation.uiCollectionViewLayoutAttributes.zIndex = this.pagerAnimation.uiCollectionViewLayoutAttributes.indexPath.row
    }
}

class StackAttributesAnimator {
    /// The max scale that would be applied to the current cell. 0 means no scale. 0.2 by default.
    pagerAnimation: PagerAnimation = null!;

    constructor(pagerAnimation: PagerAnimation) {
        this.pagerAnimation = pagerAnimation;
    }
    animate() {
        let position = this.pagerAnimation.animatedAttributes.middleOffset
        let contentOffset = this.pagerAnimation.collectionView.contentOffset
        let itemOrigin = this.pagerAnimation.animatedAttributes.attributes.frame.origin
        var transform = null;
        if (this.pagerAnimation.animatedAttributes.scrollDirection == UICollectionViewScrollDirection.Horizontal) {
            transform =  CGAffineTransformMakeTranslation(position < 0 ? contentOffset.x - itemOrigin.x : 0, 0)
        } else {
            transform = CGAffineTransformMakeTranslation(0, position < 0 ? contentOffset.y - itemOrigin.y : 0)
        }

        this.pagerAnimation.uiCollectionViewLayoutAttributes.transform = transform
        this.pagerAnimation.uiCollectionViewLayoutAttributes.zIndex = this.pagerAnimation.uiCollectionViewLayoutAttributes.indexPath.row
    }
}