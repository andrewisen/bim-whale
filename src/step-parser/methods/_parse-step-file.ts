import { StepFile } from "../step-parser.ts";
/**
 * The method method will:
 * 1. Iterate over each line in the IFC file
 * 2. Generate a so-called `step instance` from each line
 *
 * First and foremost, there's no need to include the so-called __HEADER section__.
 * We only want to include data (that's available in the __DATA section__.)
 * One can simply assume that each line will contain an equal sign (=).
 *
 *  __Example:__
 * ```#572= IFCDOOR('...');```
 */
function _parseStepFile(this: StepFile) {
    const linesLength = this.lines.length;
    for (let index = 0; index < linesLength; index++) {
        const line = this.lines[index];
        // Only include data (from the DATA section)
        if (line.indexOf("=") === -1) continue;
        const entityInstance = this.generateStepEntityInstance(line);
        if (entityInstance !== undefined)
            this.saveStepEntityInstance(entityInstance);
    }
}

// Underscore is used to distinguish this function as a method that belongs to StepFile
export { _parseStepFile };
