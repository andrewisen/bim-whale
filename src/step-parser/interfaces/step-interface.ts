interface IEntityInstance {
    // Instance, eg. #572
    instanceName: string;
    instanceStartIndex: number;
    instanceEndIndex: number;
    // Entity, e.g. IFCDOOR
    entityName: string;
    entityStartIndex: number;
    entityEndIndex: number;

    attributes?: {
        raw?: string;
        parsed?: string[];
    };
}

// interface IEnties {
//     [key: string]: IEntityInstance;
// }
interface IEnties {
    [key: string]: { [key: string]: IEntityInstance };
}

export type { IEntityInstance, IEnties };
