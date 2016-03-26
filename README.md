#Gradient-generator

The gradient generator.

# Quickstart

### Install
```sh
    npm install -s gradient-generator
```
### Examples

```
    var gg = require('gradient-generator');
    var step = 10;
    var it = getGradientIterator('#F00', '#0F0', step);
    for(int i = 0; i < step; i++) {
        console.log(it());
    }
    console.log(gg.genGradientColors()); //['#E10',...] the gradient colors 
```

That's it!

### Contribute
- let me know how it can be improved in the [github
  issues](https://github.com/tyleryang/gradient-generator/issues)
- [fork](https://github.com/tyleryang/gradient-generator) and pull-request

# Credits
built with ❤ by [Tyler Yang](http://tyleryang.com)
