import { expect, test } from 'vitest'

test('O usuário consegue criar uma nova transação', () => {
  // fazer a chamada HTTP para criar uma nova transação

  const responseStatusCode = 500

  // espera que o valor de dessa const seja igual a 201
  expect(responseStatusCode).toEqual(201)
})
