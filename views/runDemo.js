import React, { useState } from "react";
import { base } from '@airtable/blocks';
import { ProgressBar, Text, Icon, FormField, Input, Box, Heading, Button } from "@airtable/blocks/ui";
import { demoPayload } from "../controllers/getTable";
import { TablePicker, ViewPicker } from "@airtable/blocks/ui";




export const GenerateBasicReport = () => {
    const [table, setTable] = useState(base.tables[0]);
    const [view, setView] = useState(table.views[0]);
    const [value, setValue] = useState(`${table.name}`);
    return (
        <div>
            <Box padding={3} display="flex">
                <Icon name="share" marginTop={1} size={20} />
                <Heading size="small" paddingLeft={2}> Excel Exporter </Heading>
            </Box>
            <Box border="default" margin={2}>
            <Box paddingTop={3} display="flex" alignIt2ms="center">
                <Text marginX={3} flex={1} justifyContent='flex-start'><b>Table</b></Text>
                <Text marginX={3} flex={1} justifyContent='flex-end'><b>View</b></Text>
            </Box>
            <Box marginY={1} marginTop={2} display="flex" alignIt2ms="center">
                <Text as = {'p'} marginX={3} flex={1} justifyContent='flex-start'>Prepare excel as per selected Table</Text>
                <Text marginX={3} flex={1} justifyContent='flex-end'>Generate filtered view and export it from here</Text>
            </Box>
            <Box display="flex" alignIt2ms="center">
                <TablePicker flex={1} justifyContent='flex-start' marginX={3}
                    table={table}
                    onChange={newTable => setTable(newTable)}
                    width="320px"
                />
                <ViewPicker
                    flex={1} justifyContent='flex-start' marginX={3}
                    table={table}
                    view={view}
                    onChange={newView => setView(newView)}
                    width="320px"
                />
            </Box>
            <Box display="flex" alignItems="center" padding={3}>
                <FormField flex={4} justifyContent='flex-start' label="Enter FileName">
                    <Input value={value} onChange={e => setValue(e.target.value)} />
                </FormField>
                <Button
                    variant="primary" flex={1} marginLeft={1} marginTop={1} justifyContent='flex-start' onClick={() => demoPayload(table, value, view)} icon="premium">
                    Generate Excel Report
                </Button>
            </Box>
            <ProgressBar
            progress={0}
            barColor='#00A36C'
        />
            </Box>

        </div>
    )
}