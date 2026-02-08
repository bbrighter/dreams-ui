import { http, HttpResponse } from 'msw'

export const putDreamCategory = () => http.put('/dreams/:dreamId/categories/:categoryId', () => {
  return HttpResponse.json()
})

export const postDreamCategory = (overrides?: number) => http.post('/dreams/:dreamId/categories', () => {
  if (!overrides) {
    return HttpResponse.json(3)
  }
  return HttpResponse.json(overrides)
})

export const deleteDreamCategory = http.delete('/dreams/:dreamId/categories/:categoryId', () => HttpResponse.json())

export const deleteDreamPerson = http.delete('/dreams/:dreamId/persons/:personId', () => HttpResponse.json())
