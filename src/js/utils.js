export default {
    /**
     * Go through string query selectors of component and return corresponding jquery elements inside container
     * @param $container {jQuery} jquery container inside which search happens
     * @param selectors {Object} list of selectors. For ex: {name: '.class'}
     */
    parseComponent: function($container, selectors) {
        let $elements = {};

        for(let name in selectors) {
            if(selectors.hasOwnProperty(name)){
                $elements[name] = $container.find(selectors[name]);
            }
        }
        $elements.container = $container;

        return $elements;
    }
}