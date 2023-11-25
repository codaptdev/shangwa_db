import { createDatabase } from "../..";
import * as fs from 'fs';



test ('tests if main dir is made', () => {
    const db = createDatabase({
        name : 'test-db',
        shouldGitIgnore : true,
        simulatedDelayTime : 0,
    })

    expect(fs.existsSync('../../../.local/databases/test-db'))
})