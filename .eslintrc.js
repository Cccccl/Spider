module.exports = {
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6, //指定ECMAScript支持的版本，6为ES6
        "sourceType": "module"
    },
    "rules": {
        "no-console":0,
        "no-unused-vars":0,
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double", { "allowTemplateLiterals": true }
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};