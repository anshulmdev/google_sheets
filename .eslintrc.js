module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', 'spellcheck'],
    rules: {
        'react/prop-types': 0,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'spellcheck/spell-checker': [1,
            {
                "comments": true,
                "strings": true,
                "identifiers": true,
                "lang": "en_US",
                "skipWords": [
                    "dict",
                    "aff",
                    "hunspellchecker",
                    "hunspell",
                    "utils"
                 ],
                 "skipIfMatch": [
                     "http://[^s]*"
                 ],
                 "skipWordIfMatch": [
                     "^foobar.*$"
                 ],
                 "minLength": 3
             }
         ]
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
