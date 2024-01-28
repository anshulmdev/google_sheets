

const dataFormatting = (airtableTable) => {
    let formattedData = [];
    airtableTable.forEach((e) => {
        formattedData.push({
            id: e._id,
            data: e._data
        })
    })
    return formattedData
}



export const demoPayload = async (myTable) => {
    try {
        if (!myTable) throw new Error("Table not Selected to Query")
        const tableID = myTable._id;
        const queryResult = myTable.selectRecords();
        await queryResult.loadDataAsync();
        const tableRecords = queryResult;
        console.log(tableRecords.records)
        const airtableRecords = dataFormatting(tableRecords.records)
        const data = {airtableRecords};
        const response = await fetch("https://webhook.site/4dc66d2a-6d06-4bb4-ae06-3c05ce713109", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = response;
        console.log("Success:", result);


        return true;

    } catch (error) {
        console.log(error)
        return;
    }
}