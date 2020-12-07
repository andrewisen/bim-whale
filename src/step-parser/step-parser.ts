import type { IEntityInstance, IEnties } from "./interfaces/step-interface.ts";
import { _parseStepFile } from "./methods/parse-step-file.ts";
import { _generateStepEntityInstance } from "./methods/generate-step-entity-instance.ts";
import { _parseStepEntityInstanceAttributes } from "./methods/parse-step-entity-instance-attributes.ts";

/**
 * ## STEP FILE
 *
 * This class deals with [STEP](https://en.wikipedia.org/wiki/ISO_10303).
 * More specific, the so-called [STEP-file](https://en.wikipedia.org/wiki/ISO_10303-21).
 *
 * To clarify:
 * - [STEP](https://en.wikipedia.org/wiki/ISO_10303) refers to the ISO standard.
 * - [STEP-file](https://en.wikipedia.org/wiki/ISO_10303-21) is the actual file.
 *
 * This class will therefore mainly deal with the encoding mechanism that represents data.
 *
 * In layman's terms:
 * An `IFC File` is actually a so-called [STEP-file](https://en.wikipedia.org/wiki/ISO_10303-21).
 * This class will open the `IFC File` and go trough each line of the file.
 * The method {@link _generateStepEntityInstance  | generateStepEntityInstance } will create a so-called `step instance` from each line.
 *
 * The parent/super class {@link IfcFile } will take the generated `step instances` and build the relationships between objects.
 * The relationship is expressed in the [IFC2x3 TC1 schema](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/).
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
     * These entities are required to parse {@link PROPERTYSET | Property Sets}.
     */
    protected requiredEntities: string[];
    /**
     * These are the selected entities that will be parsed.
     */
    protected selectedEntities: string[];
    /**
     * These are the selected Property Sets that will be parsed.
     */
    protected selectedPropertySets: string[];
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
            requiredEntities: string[];
            selectedEntities: string[];
            selectedPropertySets: string[];
            allEntities: string[];
        }
    ) {
        this.lines = lines;
        this.entityInstances = {}; // Needs to be initialized as an empty object

        // TODO: Update this ugly bit...
        this.requiredEntities = config.requiredEntities;
        this.selectedEntities = config.selectedEntities;
        this.selectedPropertySets = config.selectedPropertySets;
        this.allEntities = config.allEntities;

        // Generate an empty object for each required entity
        this.requiredEntities.forEach((entity: string) => {
            Object.assign(this.entityInstances, { [entity]: {} });
        });

        // The non-required entities (e.g. IfcWall, IfcDoor) are treated as Generic Entity Instances
        Object.assign(this.entityInstances, { genericEntityInstances: {} });
    }
    /**
     * See {@link _parseStepFile}
     */
    public parseStepFile: any = _parseStepFile;
    /**
     * See {@link _generateStepEntityInstance }
     */
    public generateStepEntityInstance: any = _generateStepEntityInstance;
    /**
     * See {@link _parseStepInstanceAttributes}
     */
    public parseStepEntityInstanceAttributes: any = _parseStepEntityInstanceAttributes;
}

export { StepFile };
