interface IEntityInstance {
    entityName?: string;
    entityStartIndex?: number;
    entiyEndIndex?: number;

    instanceId?: string; // Instance Name
    instanceEndIndex?: number;

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
