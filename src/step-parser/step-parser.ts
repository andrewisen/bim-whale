import type { IEntityInstance, IEnties } from "./interfaces/step-interface.ts";
import { _parseStepFile } from "./methods/_parse-step-file.ts";
import { _generateStepEntityInstance } from "./methods/generate-step-entity-instance.ts";
import { _saveStepEntityInstance } from "./methods/save-step-entity-instance.ts";

/**
 * ## STEP FILE
 *
 * This class deals with [Standard for the Exchange of Product model data (STEP)](https://en.wikipedia.org/wiki/ISO_10303).
 * More specific, this class parses a [STEP-file](https://en.wikipedia.org/wiki/ISO_10303-21).
 *
 * To clarify:
 * - [STEP](https://en.wikipedia.org/wiki/ISO_10303) refers to the ISO 10303 standard.
 * - [STEP-file](https://en.wikipedia.org/wiki/ISO_10303-21) is the actual file format (used in ISO 10303)
 *
 * This class will handle the so-called "encoding mechanism that represents data".
 *
 * In layman's terms:
 * An `IFC File` is actually a [STEP-file](https://en.wikipedia.org/wiki/ISO_10303-21) behind the scenes.
 * 
 * This class will open the `IFC File` and treat is as a `STEP-file`(!).  
 * The method {@link _generateStepEntityInstance | generateStepEntityInstance } will create a so-called `step instance` from each line in the file.
 *
 * The parent/super class {@link IfcFile } will take the generated `step instances` and build the relationships between objects.
 * This relationship has nothing to do with STEP.
 * No, the relationship is expressed in the [IFC2x3 TC1 schema](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/).
 * 
 * That's why we have two different classes; StepFile & IfcFile
 * 
 * To summarize:
 * - `StepFile` builds the data (according to ISO 10303-21)
 * - `IfcFile` builds the relationship (according to the IFC2x3 TC1 schema)
 */
class StepFile {
    /**
     * Each line is stored in the {@link lines} array.
     */
    protected lines: string[];
    /**
     * Each parsed entity.
     */
    public entityInstances: any; //: IEnties;
    /**
     * These entities are required to parse {@link IfcPropertySet | Property Sets}.
     */
    protected requiredEntities: { [key: string]: string };
    /**
     * These are the selected entities that will be parsed.
     */
    protected selectedEntities: { [key: string]: string };
    /**
     * These are the selected Property Sets that will be parsed.
     */
    protected selectedPropertySets: string[];
    /**
     * These are all IFC Entities that will be parsed.
     * All other entities will be ignored.
     */
    protected allEntities: { [key: string]: string };
    /**
     * Builds the {@link entities} object from the config parameter.
     *
     * Creates empty objects for each required entity.
     * The rest (i.e. {@link selectedEntities}) are treated as a `generic entity`.
     *
     * Example:
     * ```javascript
     * this.entityInstances = {
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
            requiredEntities: { [key: string]: string };
            selectedEntities: { [key: string]: string };
            selectedPropertySets: string[];
            allEntities: { [key: string]: string };
        }
    ) {
        this.lines = lines;
        this.entityInstances = {}; // Needs to be initialized as an empty object

        // Config
        this.requiredEntities = config.requiredEntities;
        this.selectedEntities = config.selectedEntities;
        this.selectedPropertySets = config.selectedPropertySets;
        this.allEntities = config.allEntities;

        // Generate an empty object for each required entity
        Object.values(config.requiredEntities).forEach((entity: string) => {
            Object.assign(this.entityInstances, { [entity]: {} });
        });

        // The non-required entities (e.g. IfcWall, IfcDoor) are treated as Generic Entity Instances
        Object.assign(this.entityInstances, { genericEntityInstances: {} });
    }
    /**
     * See {@link _parseStepFile}
     */
    public parseStepFile: any = _parseStepFile; // START HERE
    /**
     * See {@link _generateStepEntityInstance }
     */
    public generateStepEntityInstance = _generateStepEntityInstance;
    /**
     * See {@link _saveStepEntityInstance }
     */
    public saveStepEntityInstance: any = _saveStepEntityInstance;
}

export { StepFile };
