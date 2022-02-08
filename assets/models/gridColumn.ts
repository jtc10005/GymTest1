export class GridColumn {
    title?: string = undefined;
    columnName: string;

    constructor(opts: {
        columnName: string;
        title?:string;
    }){
        this.columnName = opts.columnName;
        this.title = opts?.title ?? undefined;
    }
}