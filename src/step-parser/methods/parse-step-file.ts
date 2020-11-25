import { StepFile } from "../step-parser.ts";

/**
 * Iterates over each line.
 * Only include the so-called __DATA section__.<br>
 * One can assume that each line will contain an equal sign (=).<br>
 *
 *  __Example:__<br>
 * ```#572= IFCDOOR('...');```
 * <br>
 */
function _parseStepFile(this: StepFile) {
    const linesLength = this.lines.length;
    for (let index = 0; index < linesLength; index++) {
        const line = this.lines[index];
        if (line.indexOf("=") == -1) {
            continue;
        }
        this.generateStepInstance(line);
    }
}

// Underscore is used to distinguish this function as a method that belongs to StepFile
export { _parseStepFile };
