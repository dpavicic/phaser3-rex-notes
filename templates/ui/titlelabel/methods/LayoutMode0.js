/*
Elements:

Icon  Title      ActionIcon
Icon  Separator  ActionIcon
Icon  Text       ActionIcon

*/

import Sizer from '../../sizer/Sizer.js';
import AddChildMask from '../../../../plugins/gameobjects/container/containerlite/mask/AddChildMask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var LayoutMode0 = function (config) {
    var scene = this.scene;

    var orientation = GetValue(config, 'orientation', 0);
    this.setOrientation(orientation);

    // Add elements
    var icon = GetValue(config, 'icon', undefined);
    var iconMask = GetValue(config, 'iconMask', undefined);
    var innerBackground = GetValue(config, 'innerBackground', undefined);
    var title = GetValue(config, 'title', undefined);
    var separator = GetValue(config, 'separator', undefined);
    var text = GetValue(config, 'text', undefined);
    var action = GetValue(config, 'action', undefined);
    var actionMask = GetValue(config, 'actionMask', undefined);


    if (icon) {
        var padding;
        if (this.orientation === 0) {
            padding = {
                right: GetValue(config, 'space.icon', 0),
                top: GetValue(config, 'space.iconTop', 0),
                bottom: GetValue(config, 'space.iconBottom', 0),
            };
        } else {
            padding = {
                bottom: GetValue(config, 'space.icon', 0),
                left: GetValue(config, 'space.iconLeft', 0),
                right: GetValue(config, 'space.iconRight', 0),
            };
        }
        var fitRatio = GetValue(config, 'squareFitIcon', false) ? 1 : 0;

        this.add(
            icon,
            { proportion: 0, padding: padding, fitRatio: fitRatio }
        );

        if (iconMask) {
            iconMask = AddChildMask.call(this, icon, icon, 1); // Circle mask
        }

        if (!fitRatio) {
            var iconSize = GetValue(config, 'iconSize', undefined);
            this.setIconSize(
                GetValue(config, 'iconWidth', iconSize),
                GetValue(config, 'iconHeight', iconSize)
            );
        }
    }

    // InnerSizer : title, separator, text
    var innerSizer = new Sizer(scene, {
        orientation: 1,
    })

    if (innerBackground) {
        innerSizer.addBackground(innerBackground);
    }

    var separatorSpace = GetValue(config, 'space.separator', 0);

    if (title) {
        var align = GetValue(config, 'align.title', 'left');
        var padding = {
            bottom: (!separator && text) ? separatorSpace : 0,
            left: GetValue(config, 'space.titleLeft', 0),
            right: GetValue(config, 'space.titleRight', 0),
        }
        innerSizer.add(
            title,
            { proportion: 0, align: align, padding: padding }
        );
    }

    if (separator) {
        var padding = {
            top: (title) ? separatorSpace : 0,
            bottom: (text) ? separatorSpace : 0,
            left: GetValue(config, 'space.separatorLeft', 0),
            right: GetValue(config, 'space.separatorRight', 0),
        };
        innerSizer.add(
            separator,
            { expand: true, padding: padding }
        );
    }

    if (text) {
        var align = GetValue(config, 'align.text', 'left');
        var padding = {            
            left: GetValue(config, 'space.textLeft', 0),
            right: GetValue(config, 'space.textRight', 0),
        }
        innerSizer.add(
            text,
            { proportion: 0, align: align, padding: padding }
        );
    }

    var padding = undefined;
    if (action) {
        padding = {
            right: GetValue(config, 'space.text', 0)
        };
    }
    this.add(
        innerSizer,
        { proportion: 1, padding: padding }
    );
    // InnerSizer : title, separator, text

    if (action) {
        var padding;
        if (this.orientation === 0) {
            padding = {
                top: GetValue(config, 'space.actionTop', 0),
                bottom: GetValue(config, 'space.actionBottom', 0),
            };
        } else {
            padding = {
                left: GetValue(config, 'space.actionLeft', 0),
                right: GetValue(config, 'space.actionRight', 0),
            };
        }
        var fitRatio = GetValue(config, 'squareFitAction', false) ? 1 : 0;

        this.add(
            action,
            { proportion: 0, padding: padding, fitRatio: fitRatio }
        );

        if (actionMask) {
            actionMask = AddChildMask.call(this, action, action, 1); // Circle mask
        }

        if (!fitRatio) {
            var actionSize = GetValue(config, 'actionSize');
            this.setActionSize(
                GetValue(config, 'actionWidth', actionSize),
                GetValue(config, 'actionHeight', actionSize)
            );
        }
    }

    this.addChildrenMap('icon', icon);
    this.addChildrenMap('iconMask', iconMask);
    this.addChildrenMap('innerSizer', innerSizer);
    this.addChildrenMap('innerBackground', innerBackground);
    this.addChildrenMap('title', title);
    this.addChildrenMap('separator', separator);
    this.addChildrenMap('text', text);
    this.addChildrenMap('action', action);
    this.addChildrenMap('actionMask', actionMask);
}

export default LayoutMode0;