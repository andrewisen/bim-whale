import type { IEntityInstance, IEnties } from "./interfaces/step-interface.ts";
import { _parseStepFile } from "./methods/parse-step-file.ts";
import { _generateStepInstance } from "./methods/generate-step-instance.ts";
import { _parseStepInstanceAttributes } from "./methods/parse-step-instance-attributes.ts";

class StepFile {
    /**
     * The content of the file as a string array.
     * Each line is stored in the {@link lines} array.
     */
    protected lines: string[];
    /**
     * Each parsed entity.
     */
    public entities: any; //: IEnties;

    /**
     * These entities are required to parse {@link PROPERTYSET | Property Sets}.
     */
    protected requiredEntities: string[];
    /**
     * These are the selected entities that will be parsed.
     */
    protected selectedEntities: string[];
    /**
     * These are all IFC Entities that will be parsed.
     * All other entities will be ignored.
     */
    protected allEntities: string[];

    /**
     * Builds the {@link entities} object from the config parameter.
     *
     * Creates empty objects for each required entity.
     * The rest (i.e. {@link selectedEntities}) are treated as a `generic entity`.
     *
     * Example:
     * ```javascript
     * this.entities = {
     *      IFCPROPERTYSINGLEVALUE = {},
     *      IFCRELDEFINESBYPROPERTIES = {},
     *      IFCPROPERTYSET = {},
     *      ...
     *      genericEntities = {}
     * }
     * ```
     */
    constructor(
        lines: string[],
        config: {
            requiredEntities: string[];
            selectedEntities: string[];
            allEntities: string[];
        }
    ) {
        this.lines = lines;
        this.entities = {}; // Needs to be initialized as an empty object

        this.requiredEntities = config.requiredEntities;
        this.selectedEntities = config.selectedEntities;
        this.allEntities = config.allEntities;

        this.requiredEntities.forEach((entity: string) => {
            Object.assign(this.entities, { [entity]: {} });
        });

        // The rest are treated as a generic entities.
        Object.assign(this.entities, { genericEntities: {} });
    }
    /**
     * See {@link _parseStepFile}
     */
    public parseStepFile: any = _parseStepFile;
    /**
     * See {@link _generateStepInstance}
     */
    public generateStepInstance: any = _generateStepInstance;
    /**
     * See {@link _parseStepInstanceAttributes}
     */
    public parseStepInstanceAttributes: any = _parseStepInstanceAttributes;
}

function dev(lines: any, config: any) {
    let ifcFile = new StepFile(lines, config);
    ifcFile.parseStepFile();
}

export { StepFile, dev };
