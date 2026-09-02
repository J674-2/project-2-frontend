import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './src/mocks/node.ts'

beforeAll(() => server.listen())

afterEach(() => {
    cleanup();
    server.resetHandlers()
})

afterAll(() => server.close())