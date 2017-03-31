(function() {
    'use strict';

    angular
        .module('app')
        .config(themesConfig);

    /* @ngInject */
    function themesConfig ($mdThemingProvider, triThemingProvider, triSkinsProvider) {
        /**
         *  PALETTES
         */
        $mdThemingProvider.definePalette('white', {
            '50': 'ffffff',
            '100': 'ffffff',
            '200': 'ffffff',
            '300': 'ffffff',
            '400': 'ffffff',
            '500': 'ffffff',
            '600': 'ffffff',
            '700': 'ffffff',
            '800': 'ffffff',
            '900': 'ffffff',
            'A100': 'ffffff',
            'A200': 'ffffff',
            'A400': 'ffffff',
            'A700': 'ffffff',
            'contrastDefaultColor': 'dark'
        });

        $mdThemingProvider.definePalette('black', {
            '50': 'e1e1e1',
            '100': 'b6b6b6',
            '200': '8c8c8c',
            '300': '646464',
            '400': '3a3a3a',
            '500': 'e1e1e1',
            '600': 'e1e1e1',
            '700': '232323',
            '800': '1a1a1a',
            '900': '121212',
            'A100': '3a3a3a',
            'A200': 'ffffff',
            'A400': 'ffffff',
            'A700': 'ffffff',
            'contrastDefaultColor': 'light'
        });

        $mdThemingProvider.definePalette('lima-links-green', {
            '50': 'a6c938',
            '100': 'ffffff',//'100': 'b7d25f',
            '200': 'c8dc88',
            '300': 'd9e6ad',
            '400': 'ebf1d4',
            '500': 'ebf1d4',
            '600': 'ebf1d4',
            '700': 'ebf1d4',
            '800': 'ebf1d4',
            '900': 'ebf1d4',
            'A100': 'ebf1d4',
            'A200': 'ffffff',
            'A400': 'ffffff',
            'A700': '7d7e80',
            'contrastDefaultColor': 'dark',
            'contrastDarkColors': 'A700',
            'contrastStrongLightColors': 'A700'
        });


        $mdThemingProvider.definePalette('lima-links-brown', {
            '50': '231f20',
            '100': '231f20',
            '200': '231f20',
            '300': '231f20',
            '400': '231f20',
            '500': '231f20',
            '600': '231f20',
            '700': '231f20',
            '800': '231f20',
            '900': '231f20',
            'A100': '231f20',
            'A200': '231f20',
            'A400': '231f20',
            'A700': '231f20',
            'contrastDefaultColor': 'light'
        });

        $mdThemingProvider.definePalette('lima-links-gray', {
            '50': '7d7e80',
            '100': '7d7e80',
            '200': '7d7e80',
            '300': '7d7e80',
            '400': '7d7e80',
            '500': '7d7e80',
            '600': '7d7e80',
            '700': '7d7e80',
            '800': '7d7e80',
            '900': '7d7e80',
            'A100': '7d7e80',
            'A200': '7d7e80',
            'A400': '7d7e80',
            'A700': '7d7e80',
            'contrastDefaultColor': 'light'
        });



        var triCyanMap = $mdThemingProvider.extendPalette('cyan', {
            'contrastDefaultColor': 'light',
            'contrastLightColors': '500 700 800 900',
            'contrastStrongLightColors': '500 700 800 900'
        });

        // Register the new color palette map with the name triCyan
        $mdThemingProvider.definePalette('triCyan', triCyanMap);

        /**
         *  SKINS
         */

        // CYAN CLOUD SKIN
        triThemingProvider.theme('cyan')
        .primaryPalette('triCyan')
        .accentPalette('amber')
        .warnPalette('deep-orange');

        triThemingProvider.theme('cyan-white')
        .primaryPalette('white')
        .accentPalette('triCyan', {
            'default': '500'
        })
        .warnPalette('deep-orange');

        triSkinsProvider.skin('cyan-cloud', 'Cyan Cloud')
        .sidebarTheme('cyan')
        .toolbarTheme('cyan-white')
        .logoTheme('cyan')
        .contentTheme('cyan');

        // RED DWARF SKIN
        triThemingProvider.theme('red')
        .primaryPalette('red')
        .accentPalette('amber')
        .warnPalette('purple');

        triThemingProvider.theme('white-red')
        .primaryPalette('white')
        .accentPalette('red', {
            'default': '500'
        })
        .warnPalette('purple');

        triSkinsProvider.skin('red-dwarf', 'Red Dwarf')
        .sidebarTheme('red')
        .toolbarTheme('white-red')
        .logoTheme('red')
        .contentTheme('red');

        // PLUMB PURPLE SKIN
        triThemingProvider.theme('purple')
        .primaryPalette('purple')
        .accentPalette('deep-orange')
        .warnPalette('amber');

        triThemingProvider.theme('white-purple')
        .primaryPalette('white')
        .accentPalette('purple', {
            'default': '400'
        })
        .warnPalette('deep-orange');

        triSkinsProvider.skin('plumb-purple', 'Plumb Purple')
        .sidebarTheme('purple')
        .toolbarTheme('white-purple')
        .logoTheme('purple')
        .contentTheme('purple');

        // DARK KNIGHT SKIN
        triThemingProvider.theme('dark')
        .primaryPalette('black', {
            'default': '300',
            'hue-1': '400'
        })
        .accentPalette('amber')
        .warnPalette('deep-orange')
        .backgroundPalette('black')
        .dark();

        triSkinsProvider.skin('dark-knight', 'Dark Knight')
        .sidebarTheme('dark')
        .toolbarTheme('dark')
        .logoTheme('dark')
        .contentTheme('dark');

        // BATTLESHIP GREY SKIN
        triThemingProvider.theme('blue-grey')
        .primaryPalette('blue-grey')
        .accentPalette('amber')
        .warnPalette('orange');

        triThemingProvider.theme('white-blue-grey')
        .primaryPalette('white')
        .accentPalette('blue-grey', {
            'default': '400'
        })
        .warnPalette('orange');

        triSkinsProvider.skin('battleship-grey', 'Battleship Grey')
        .sidebarTheme('blue-grey')
        .toolbarTheme('white-blue-grey')
        .logoTheme('blue-grey')
        .contentTheme('blue-grey');

        // ZESTY ORANGE SKIN
        triThemingProvider.theme('orange')
        .primaryPalette('orange' , {
            'default': '800'
        })
        .accentPalette('lime')
        .warnPalette('amber');

        triThemingProvider.theme('white-orange')
        .primaryPalette('white')
        .accentPalette('orange', {
            'default': '500'
        })
        .warnPalette('lime');

        triSkinsProvider.skin('zesty-orange', 'Zesty Orange')
        .sidebarTheme('orange')
        .toolbarTheme('white-orange')
        .logoTheme('orange')
        .contentTheme('orange');


        // INDIGO ISLAND SKIN
        triThemingProvider.theme('indigo')
        .primaryPalette('indigo' , {
            'default': '600'
        })
        .accentPalette('red')
        .warnPalette('lime');

        triSkinsProvider.skin('indigo-island', 'Indigo Island')
        .sidebarTheme('indigo')
        .toolbarTheme('indigo')
        .logoTheme('indigo')
        .contentTheme('indigo');

        // KERMIT GREEN SKIN
        triThemingProvider.theme('light-green')
        .primaryPalette('light-green' , {
            'default': '400'
        })
        .accentPalette('amber')
        .warnPalette('deep-orange');

        triThemingProvider.theme('white-light-green')
        .primaryPalette('white')
        .accentPalette('light-green', {
            'default': '400'
        })
        .warnPalette('deep-orange');

        triSkinsProvider.skin('kermit-green', 'Kermit Green')
        .sidebarTheme('light-green')
        .toolbarTheme('white-light-green')
        .logoTheme('light-green')
        .contentTheme('light-green');

        /*Creating Custom Skin using for Lima Links*/

        triThemingProvider.theme('lima-links-green')
        .primaryPalette('lima-links-green', {
          'default': '50'
        })
        .accentPalette('orange')
        .warnPalette('deep-orange');

        triThemingProvider.theme('lima-links-brown')
        .primaryPalette('lima-links-brown', {
          'default': '50'
        })
        .accentPalette('deep-orange')
        .warnPalette('deep-orange');

        triSkinsProvider.skin('lima-links-light', 'Lima Links - Light')
        .sidebarTheme('white-light-green')
        .toolbarTheme('lima-links-green')
        .logoTheme('lima-links-green')
        .contentTheme('cyan');

        triSkinsProvider.skin('lima-links-dark', 'Lima Links - Dark')
        .sidebarTheme('white-light-green')
        .toolbarTheme('lima-links-brown')
        .logoTheme('lima-links-brown')
        .contentTheme('light-green');


        triSkinsProvider.skin('lima-links-ultra-light', 'Lima Links - Ultra Light')
        .sidebarTheme('lima-links-green')
        .toolbarTheme('white-light-green')
        .logoTheme('white-light-green')
        .contentTheme('lima-links-green');






        /**
         *  FOR DEMO PURPOSES ALLOW SKIN TO BE SAVED IN A COOKIE
         *  This overrides any skin set in a call to triSkinsProvider.setSkin if there is a cookie
         *  REMOVE LINE BELOW FOR PRODUCTION SITE
         */
        triSkinsProvider.useSkinCookie(true);

        /**
         *  SET DEFAULT SKIN
         */

        triSkinsProvider.setSkin('lima-links-ultra-light');
    }
})();
