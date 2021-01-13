import type { IEntityInstance } from "../interfaces/step-interface.ts";
import { parseStepEntityInstanceAttributes } from "./parse-step-entity-instance-attributes.ts";

// Get STEP Attributes, e.g. '1F6...',#42,'M_Single-Flush...',$,...`
const getStepAttributes = (_: {
    line: string;
    entityInstance: IEntityInstance;
}) => {
    const { line } = _;
    let { entityInstance } = _;
    return parseStepEntityInstanceAttributes(
        line.substring(entityInstance.entityStartIndex + 1, line.length - 2),
        entityInstance.entityName
    );
};

export { getStepAttributes };
