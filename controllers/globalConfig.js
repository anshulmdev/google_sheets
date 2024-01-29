
import {globalConfig} from '@airtable/blocks';




export const setGlobalVariables = async () => {
    await globalConfig.setAsync('credits', 9000);
}