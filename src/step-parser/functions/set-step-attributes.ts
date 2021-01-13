import type { IEntityInstance } from "../interfaces/step-interface.ts";

// Set STEP Attributes, e.g. '1F6...',#42,'M_Single-Flush...',$,...`
const setStepAttributes = (_: {
    line: string;
    entityInstance: IEntityInstance;
    parsedAttributes: string[];
}) => {
    const { line, parsedAttributes } = _;
    let { entityInstance } = _;
    entityInstance.attributes = {
        parsed: parsedAttributes,
    };
};

export { setStepAttributes };
