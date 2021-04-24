/*:
 * @plugindesc (v.1.1) Creates a Grid Inventory with the iconset
 * @author Jiffy
 *
 * @param itemListHeight
 * @desc Change Item List Height| Default:32
 * @default 32
 *
 * @param windowWidth
 * @desc Change Window Width| Default:815
 * @default 815
 *
 * @param maxItemCategoryColumns
 * @desc Change Item Category Max Columns| Default:1
 * @default 1
 *
 * @param itemListMaxColumns
 * @desc Change Item List Max Columns| Default:10
 * @default 10
 *
 * @param windowItemListX
 * @desc Change the Item List Window X Value| Default:1
 * @default 1
 *
 * @param windowItemListY
 * @desc Change the Item List Window Y Value| Default:180
 * @default 180
 *
 * @param windowItemListWidth
 * @desc Change the Item List Window Width Value| Default:640
 * @default 815
 *
 * @param windowItemListHeight
 * @desc Change the Item List Window Height Value| Default:540
 * @default 445
 *
 * @param windowItemCategoryX
 * @desc Change the Window Item Category X Value| Default:640
 * @default 1
 *
 * @param windowItemCategoryY
 * @desc Change the Window Item Category Y Value| Default:108
 * @default 108
 *
 * @help
 *   Jiffy's Grid Inventory Plugin
 * ===========================================================================
 * This plugin creates a grid inventory. Where, rather than drawing the name
 * and icon like the default menu, it is changed to a much smaller and 
 * condensed inventory that uses the iconset.
 * 
 *
 * ===========================================================================
 *   Terms of Use
 * ===========================================================================
 * This plugin can be used in any game, commercial or non commercial, as long
 * as proper credit is given to the author (Jiffy). 
 * As long as the Terms of Use have been accepted first, you are allowed to 
 * edit this plugin in anyway. However, redistribution of this plugin in any 
 * way is not permitted.
 * ===========================================================================
 *   Parameter Explanation
 * ===========================================================================
 * itemListHeight - The height of the selection box.
 * windowWidth - The Width of the Item Category list window (Items, Weapons 
 * etc.)
 * maxItemCategoryColumns - The max columns of the Item Category List window
 * itemListMaxColumns - The max columns of the items (Note: It is not suggested 
 * to change this.)
 * windowItemListX - The X location of the Item List window
 * windowItemListY - The Y location of the Item List window
 * windowItemListWidth - The width of the item list window
 * windowItemListHeight - The height of the item list window
 * windowItemCategoryX - The X value of the Item Category Window
 * windowItemCategoryY - The Y value of the Item Category Window
 * ===========================================================================
 * Thanks for reading! If you have any questions regarding this plugin, feel
 * free to DM me on RPGMakerWeb or comment on my YouTube channel!
 * Youtube.com/Jiffy <- Youtube is having issues at the moment so this may
 * not be right.
 *
 * Thanks again
 * - Jiffy
 */
 ///////////////////
 // Plugin Vers.  //
 ///////////////////

console.log('You are currently using Vers. 1.1 of JIF_GridInventory');

 ///////////////////
 // Parameters    //
 //////////////////

 var parameters = PluginManager.parameters('JIF_GridInventory');

 var itemListHeight = Number(parameters['itemListHeight']);
 var windowWidth = Number(parameters['windowWidth']);
 var maxItemCategoryColumns = Number(parameters['maxItemCategoryColumns']);
 var itemListMaxColumns = Number(parameters['itemListMaxColumns']);
 var windowItemListX = Number(parameters['windowItemListX']);
 var windowItemListY = Number(parameters['windowItemListY']);
 var windowItemListWidth = Number(parameters['windowItemListWidth']);
 var windowItemListHeight = Number(parameters['windowItemListHeight']);
 var windowItemCategoryX = Number(parameters['windowItemCategoryX']);
 var windowItemCategoryY = Number(parameters['windowItemCategoryY']);

  Window_EquipCommand.prototype.maxCols = function() {
    return 10;
};

 Window_ItemList.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item) {}
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        this.drawItemNumber(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
};

    Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    if (this.needsNumber()) {}
        this.drawText($gameParty.numItems(item), x, y, width, 'right');
};

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText();
    }
};

Window_ItemList.prototype.itemHeight = function() {
    return itemListHeight;
};

Window_ItemCategory.prototype.windowWidth = function() {
    return windowWidth;
};

Window_ItemCategory.prototype.maxCols = function() {
    return maxItemCategoryColumns;
};

Window_ItemList.prototype.maxCols = function() {
    return itemListMaxColumns;
};

Window_ItemList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, windowItemListX, windowItemListY, windowItemListWidth, windowItemListHeight);
    this._category = 'none';
    this._data = [];
};

Window_ItemCategory.prototype.initialize = function() {
    Window_HorzCommand.prototype.initialize.call(this, windowItemCategoryX, windowItemCategoryY);
};


 