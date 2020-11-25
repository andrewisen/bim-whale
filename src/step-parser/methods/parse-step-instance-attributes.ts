import { StepFile } from "../step-parser.ts";

/**
 *
 * Parse an _attribute string_ into a JavaScript object.
 * The so-called _attribute string_ is derived from {@link _generateInstance}.
 *
 * __Example:__
 * ```#572= IFCDOOR('1F6umJ5H50aeL3A1As_wUF',#42,'M_Single-Flush:Outside door:346843',$,'M_Single-Flush:Outside door',#938,#566,'346843',2134.,915.);```
 *
 * In this example, the _attribute string_ is `'1F6umJ5H50aeL3A1As_wUF',#42,'M_Single-Flush:Outside door:346843',$,'M_Single-Flush:Outside door',#938,#566,'346843',2134.,915.`.
 * The _attribute string_  must first be converted into a _JSON string_.
 * [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) will convert the _JSON string_ into a _JSON object_.
 *
 * We can clearly see that the _attribute string_ __IS NOT__ compatible with JSON.
 * Firstly, apostrophes are not supported (there needs to be quotation marks).
 * Secondly, some attributes are not enclosed by quotation marks. E.g. `#938`(see example above).
 *
 * In summary, we want the following:
 * ```[ "1F6umJ5H50aeL3A1As_wUF", "#42", "M_Single-Flush:Outside door:346843", "$", "M_Single-Flush:Outside door", "#938","#566","346843","2134.","915."]```
 *
 * ## RegEx
 * Regular Expression is probably the easiest way to convert the _attribute string_ into a _JSON_.
 * Please note that each RegEx will impact the performance.
 *
 * I have provides a very basic set of RegEx, this will work _in most cases_.
 * Feel free to tweak this to your own liking. My favorite RegEx tool is [https://regex101.com](https://regex101.com)
 *
 * Here are some noteworthy difficult lines.
 * _As instances:_
 * ```javascript
 * #278= IFCPROPERTYSINGLEVALUE('Structural',$,IFCBOOLEAN(.F.),$);
 * #261= IFCWALLTYPE('1F6umJ5H50aeL3A1As_wV9',#42,'Basic Wall:Bearing Wall',$,$,(#332,#334,#336,#338,#340,#343,#346,#349,#352,#355,#359,#363,#370),$,'346781',$,.STANDARD.);
 * #121= IFCPROJECT('2nxdYR2RHCDBiKJulbA_QU',#42,'// PROJECT/NUMBER //',$,$,'// PROJECT/NAME //','// PROJECT/STATUS //',(#113),#108);
 * #228= IFCQUANTITYLENGTH('Height',$,$,4000.);
 * #754= IFCPROPERTYSINGLEVALUE('AboveGround',$,IFCLOGICAL(.U.),$);
 * #652= IFCPROPERTYSINGLEVALUE('Thermal Resistance (R)',$,IFCREAL(0.270116960643959),$);
 * ```
 * _As attribute strings:_
 * ```javascript
 * 'Structural',$,IFCBOOLEAN(.F.),$)
 * '1F6umJ5H50aeL3A1As_wV9',#42,'Basic Wall:Bearing Wall',$,$,(#332,#334,#336,#338,#340,#343,#346,#349,#352,#355,#359,#363,#370),$,'346781',$,.STANDARD.
 * '2nxdYR2RHCDBiKJulbA_QU',#42,'// PROJECT/NUMBER //',$,$,'// PROJECT/NAME //','// PROJECT/STATUS //',(#113),#108
 * 'Height',$,$,4000.
 * 'AboveGround',$,IFCLOGICAL(.U.),$
 * 'Thermal Resistance (R)',$,IFCREAL(0.270116960643959),$
 * ```
 *
 * There are at least five different things to consider
 * 1. "Function"
 * 2. Indefinite attribute
 * 3. Nested attribute
 * 4. References
 * 5. Integers
 *
 * ### 1. Functions
 * Example:
 *
 * ```javascript
 * IFCIDENTIFIER('Outside door')
 * IFCTHERMALTRANSMITTANCEMEASURE(3.7021)
 * IFCTEXT('')
 * IFCLOGICAL(.U.)
 * ```
 *
 * For the sake of simplicity, let's call and treat these as functions.
 * Note that each function has different ways to pass in parameters.
 * Some parameters are enclosed with apostrophe, and some are not.
 *
 * We need a RegEx that takes this into consideration.
 * The simplest form is:
 * `[A-Z]+\('[a-zA-z_ ]+'\)`
 *
 * Let's take the first function `IFCIDENTIFIER('Outside door')` as an example.
 * The regex will find us the name of the function...
 *
 * However, this is to no good use yet.
 * We need to capture both the _function name_ and the _parameters_, i.e. __IFCIDENTIFIER__ and __Outside door__
 *
 * Our RegEx now becomes: `([A-Z]+\()'([a-zA-z_ ]+)'\)`
 * It is crucial that you understand what this RegEx mean... it will only get more difficult from here.
 *
 * Anyways, we can substitute our string using the expression `$1$2)`.
 *
 * ### 2. Indefinite attribute
 * Example: `#764= IFCRELDEFINESBYPROPERTIES('0Jv9wzDiT2Fx3l2pN5PrZ7',#42,$,$,(#140),#752);`
 *
 * _Indefinite attribute_ are parameters that has not been assigned. These are represented with a dollar sign (__$__).
 * Note that a dollar sign might appear in the UIID, e.g. `2HlE6XRD5D2u$q88QiyvCI`
 *
 * One can simply assume that _indefinite attributes_ __ALWAYS__ begins with a comma (and not a character).
 *
 * ### 3. Nested attribute
 * Example: `#810= IFCPROPERTYSET('0eCyo1mQf61RRDb8LkFhbB',#42,'Other',$,(#781,#782,#783,#784,#785));`
 *
 * The _nested attributes_ are the ones enclosed by parentheses, i.e. __#781,#782,#783,#784,#785__.
 * We need enclose them with square brackets.
 *
 * ### 4. References
 * Example: `#219= IFCWALLSTANDARDCASE('1F6umJ5H50aeL3A1As_wTm',#42,'Basic Wall:Bearing Wall:346660',$,'Basic Wall:Bearing Wall',#188,#215,'346660');`
 *
 * The _wall entity_ is referencing the entities __188__ and __215__.
 * These references need to be enclosed by apostrophes or quotations marks.
 * I have opted to use apostrophes and change these to quotations marks at the very end.
 *
 * Note that references inside _nested attributes_ also need to be enclosed.
 *
 * ### 5. Integers
 * Example: `#572= IFCDOOR('1F6umJ5H50aeL3A1As_wUF',#42,'M_Single-Flush:Outside door:346843',$,'M_Single-Flush:Outside door',#938,#566,'346843',2134.,915.);`
 *
 * The last two parameters are integers; __2134.__, __915.__.
 * Note that the zero is omitted in these cases.
 */
function _parseStepInstanceAttributes(this: StepFile, raw: string) {
    const foo =
        "[" +
        raw
            .replace(/\\/g, "") // backward slashes
            .replace(/\//g, "\\/") // forward slashes
            .replace(/\"/g, '\\"') // quotation marks
            .replace(/[^,]\'\'[^\)]/g, "") // Apostrophes
            .replace(/(\(|\,)(\..+\.)(\)|\,?)/g, "$1'$2'$3") // ".T.", ".F.", ".UNDEFINED.", etc.
            .replace(
                /([A-Z]+\()'?([0-9a-åA-Ö-_\/({}),.%&@$:;+=?*"#<> ]*)'?\)/g,
                "'$1$2)'"
            ) // 1. Functions
            .replace(/(,\$)/g, ",'$$'") // 2. Indefinite attribute
            .replace(/(^|,)\((#\d+.*?)\)/g, "$1[$2]") // 3. Nested attributes:
            .replace(/([,\[])(#\d+)+/g, "$1'$2'") // 4. References to other entities
            .replace(/,(\d+[.]\d*)/g, ",'$1'") // / 5. Integers
            .replace(/'/g, '"') + // Convert apostrophes to quotes
        "]";
    let bar = [];
    try {
        bar = JSON.parse(foo);
    } catch (error) {
        console.log(raw);
        console.log(foo);
        console.log(" ");
    }
    return bar;
}

// Underscore is used to distinguish this function as a method that belongs to StepFile
export { _parseStepInstanceAttributes };
