import type { IEntityInstance } from "../interfaces/step-interface.ts";

/**
 * Set STEP Instance Name, eg. #572
 * @param _
 */
const setStepInstanceName = (_: {
    line: string;
    entityInstance: IEntityInstance;
}) => {
    const {
        line,
        entityInstance: { instanceEndIndex },
    } = _;
    let { entityInstance } = _;
    entityInstance.instanceName = line.substring(0, instanceEndIndex);
};

export { setStepInstanceName };
