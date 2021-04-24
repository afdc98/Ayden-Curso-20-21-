//=============================================================================
// Simple_Item_Scene
//-----------------------------------------------------------------------------
// This plugin changes the default Scene Item.
//=============================================================================

/*:
 @plugindesc This plugin changes the default Scene Item.
 @author King Gerar
 
 @param windowWidth
 @text Width of items window on simple item scene.
 @default 300
 @min 48
 @type number
 
 @param windowHeight
 @text Height of items window on simple item scene.
 @default 500
 @min 96
 @type number
 
 @help
 ------------------------------------------------------------------------------
 Added Functions:
 
 Overwritten Functions:
	 Scene_Item.create
	 Scene_Item.createItemWindow
	 Window_ItemList.maxCols
	 
 Aliased Functions:

*/
	
(function() {
	'use strict';
	
	window.Imported = window.Imported || {};
	
	Imported.Simple_Item_Scene = true;
	
	var Simple_Item_Scene = {
		width: Number(PluginManager.parameters('Simple_Item_Scene')['windowWidth']),
		height: Number(PluginManager.parameters('Simple_Item_Scene')['windowHeight'])
	};
	
	Scene_Item.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createItemWindow();
    this.createActorWindow();
	};
	
	Scene_Item.prototype.createItemWindow = function() {
    var x = (Graphics.boxWidth - Simple_Item_Scene.width) / 2;
		var y = (Graphics.boxHeight - Simple_Item_Scene.height) / 2;
    this._itemWindow = new Window_ItemList(x, y, Simple_Item_Scene.width, Simple_Item_Scene.height);
		console.log(x, y, Simple_Item_Scene.width, Simple_Item_Scene.height);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._itemWindow);
		this._itemWindow._category = 'keyItem';
		this._itemWindow.select(0);
		this._itemWindow.activate();
		this._itemWindow.refresh();
	};
	
	Window_ItemList.prototype.maxCols = function() {
    return 1;
	};

}());