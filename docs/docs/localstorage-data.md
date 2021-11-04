## Introduction

Sync data from [data manager](datamanager.md) to [local-storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

- Author: Rex
- Member of scene

!!! note "Max Size"
    5MB per app per browser.

## Live demos

- [Extend game registry](https://codepen.io/rexrainbow/pen/zYdpEOj)
- [New local storage data manager](https://codepen.io/rexrainbow/pen/porprXP)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/localstorage-data)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexlocalstoragedataplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlocalstoragedataplugin.min.js', true);
    ```
- Extend existed data object (`game.registry`, or `scene.data`)
    ```javascript
    var data = scene.plugins.get('rexlocalstoragedataplugin').extend(game.registry, config);
    // var data = scene.plugins.get('rexlocalstoragedataplugin').extend(scene.data, config);
    ```
- New local storage data manager
    ```javascript
    var data = scene.plugins.get('rexlocalstoragedataplugin').add(parent, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import LocalStorageDataPlugin from 'phaser3-rex-plugins/plugins/localstoragedata-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexLocalStorageData',
                plugin: LocalStorageDataPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Extend existed data object (`game.registry`, or `scene.data`)
    ```javascript
    var data = scene.plugins.get('rexLocalStorageData').extend(game.registry, config);
    // var data = scene.plugins.get('rexLocalStorageData').extend(scene.data, config);
    ```
- New local storage data manager
    ```javascript
    var data = scene.plugins.get('rexLocalStorageData').add(parent, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import LocalStorageData from 'phaser3-rex-plugins/plugins/localstoragedata.js';
    ```
- New local storage data manager
    ```javascript
    var data = new LocalStorageData(parent, config);
    ```

### Create instance

```javascript
var data = scene.plugins.get('rexLocalStorageData').add(parent, {
    // name: '',
    // load: true,
    // default: undefined,
    // reset: false
});
// var data = scene.plugins.get('rexRData').add(parent, eventEmitter, config);
```

- `parent` : The object (a scene, or a game object) that this DataManager belongs to.
- `name` : Prefix of key in local storage.
- `load` :
    - `true` : Load data from local storage. Default behavior.
    - `false` : Don't load data now.
- `default` : Define valid keys and default values of loaded data.
    - `undefined` : Load all keys from local storage.
- `reset` : 
    - `true` : Rest all data to default values (`default`). 
- `eventEmitter` : The DataManager's [event emitter](eventemitter3.md).

### Load

```javascript
data.load(defaultData);
// data.load(defaultData, reset);
```

- `defaultData` : Define valid keys and default values of loaded data.
    - `undefined` : Load all keys from local storage.
- `reset` : 
    - `true` : Rest all data to default values (`defaultData`). 

!!! note
    Already load data from local storage if `load` is `true`.

### Get/set/remove value

See [built-in data manager](datamanager.md).