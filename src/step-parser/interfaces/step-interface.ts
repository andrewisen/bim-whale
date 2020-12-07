interface IEntityInstance {
    entityName?: string;
    entityStartIndex?: number;
    entiyEndIndex?: number;

    instanceName?: string;
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
