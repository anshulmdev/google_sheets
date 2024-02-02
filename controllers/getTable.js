import { excelConverter } from "./excelConverter";


export const demoPayload = async (myTable, fileName, view, setProgress, credits, setErrorDialogOpen) => {
    try {
        if (!myTable) throw new Error("Table not Selected to Query")
        const queryResult = view.selectRecords();
        await queryResult.loadDataAsync();

        const viewMetadata = view.selectMetadata();
        await viewMetadata.loadDataAsync();
        const tableRecords = queryResult;
        const tableFields = viewMetadata.visibleFields;

        await excelConverter(fileName, tableFields, tableRecords, setProgress, credits);

        return true;

    } catch (error) {
        await setProgress(0.0);
        await setErrorDialogOpen(error.message)
        return;
    }
}