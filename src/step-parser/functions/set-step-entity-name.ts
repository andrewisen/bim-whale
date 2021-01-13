import type { IEntityInstance } from "../interfaces/step-interface.ts";

// Set STEP Entity Name, e.g. IFCDOOR
const setStepEntityName = (_: {
    line: string;
    entityInstance: IEntityInstance;
}) => {
    const {
        line,
        entityInstance: { instanceEndIndex },
        entityInstance: { entityStartIndex },
    } = _;
    let { entityInstance } = _;
    entityInstance.entityName = line.substring(
        instanceEndIndex + 2,
        entityStartIndex
    );
};

export { setStepEntityName };
