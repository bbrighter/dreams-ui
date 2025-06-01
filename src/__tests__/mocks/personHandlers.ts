import { http, HttpResponse } from 'msw';

import { EntityPersonsResponse } from '../../api/generated_api';

const personHandlers = (baseUrl: string) => ([
    http.get(baseUrl + '/persons', () => HttpResponse.json({
        persons: [{ id: 1, name: 'Person' }],
    } as EntityPersonsResponse)),
])


export default personHandlers

