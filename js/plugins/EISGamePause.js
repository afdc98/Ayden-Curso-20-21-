"use strict";
//=============================================================================
// EISGamePause.js                                                             
//=============================================================================
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*:
*
* @author Kino
* @plugindesc Gives you the ability to pause the game.
*
* @param Pause Text
* @desc Text in the pause window.
* @default Pause
*
* @param Pause Key
* @desc The key to pause the game. Example: Enter, P, Y, A, etc
* @default A
*
* @param Window Width
* @desc Width of the game pause window
* @default 125
*
* @param Window Height
* @desc Height of the game pause window.
* @default 75
*
* @help
* Version 1.00
//=============================================================================
// Features
//=============================================================================
*
* - Pauses the game.
* - Stops the game clock.
*
//=============================================================================
//  Contact Information
//=============================================================================
*
* Contact me via twitter: EISKino, or on the rpg maker forums.
* Username on forums: Kino.
*
* Forum Link: http://forums.rpgmakerweb.com/index.php?/profile/75879-kino/
* Website Link: http://endlessillusoft.com/
* Twitter Link: https://twitter.com/EISKino
* Patreon Link: https://www.patreon.com/EISKino
*
* Hope this plugin helps, and enjoy!
* --Kino
*/
(function () {
    var params = PluginManager.parameters("EISGamePause");
    var pauseText = params['Pause Text'];
    var pauseKey = params['Pause Key'].toUpperCase().charCodeAt(0);
    var windowWidth = Number(params['Window Width']);
    var windowHeight = Number(params['Window Height']);
    function setup() {
        'use strict';
        //=============================================================================
        //  Scene_Pause
        //=============================================================================
        var Scene_Pause = /** @class */ (function (_super) {
            __extends(Scene_Pause, _super);
            function Scene_Pause() {
                return _super.call(this) || this;
            }
            Scene_Pause.prototype.create = function () {
                _super.prototype.create.call(this);
                this.createPauseWindow();
            };
            Scene_Pause.prototype.createPauseWindow = function () {
                this._pauseWindow =
                    new Window_Pause(Graphics.width / 2 - (windowWidth / 2), Graphics.height / 2, windowWidth, windowHeight);
                this.addWindow(this._pauseWindow);
                this._pauseWindow.refresh();
            };
            Scene_Pause.prototype.update = function () {
                this.processExit();
            };
            Scene_Pause.prototype.processExit = function () {
                if (Input.isPressed('cancel') || TouchInput.isCancelled()) {
                    this.popScene();
                }
            };
            return Scene_Pause;
        }(Scene_MenuBase));
        //=============================================================================
        //  Window_Pause
        //=============================================================================
        var Window_Pause = /** @class */ (function (_super) {
            __extends(Window_Pause, _super);
            function Window_Pause(x, y, width, height) {
                return _super.call(this, x, y, width, height) || this;
            }
            Window_Pause.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            Window_Pause.prototype.refresh = function () {
                if (this.contents) {
                    this.contents.clear();
                    this.drawPause();
                }
            };
            Window_Pause.prototype.drawPause = function () {
                this.drawText(pauseText, 0, 0, this.contentsWidth(), "center");
            };
            return Window_Pause;
        }(Window_Base));
        //=============================================================================
        //  Graphics
        //=============================================================================
        var _Graphics_render = Graphics.render;
        Graphics.render = function (stage) {
            _Graphics_render.call(this, stage);
            if (SceneManager._scene instanceof Scene_Pause) {
                this.frameCount--;
            }
        };
        //=============================================================================
        //  Game_System
        //=============================================================================
        Game_System.prototype['pauseGame'] = function () {
            if (SceneManager._scene instanceof Scene_Map) {
                SceneManager.push(Scene_Pause);
            }
            else if (SceneManager._scene instanceof Scene_Pause) {
                SceneManager._scene.popScene();
            }
        };
        //=============================================================================
        //  Event Listener
        //=============================================================================
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === pauseKey)
                $gameSystem['pauseGame']();
        });
        Object.assign(window, {
            Scene_Pause: Scene_Pause
        });
    }
    setup();
})();
