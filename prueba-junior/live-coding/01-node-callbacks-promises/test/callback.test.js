import { describe, it, beforeEach, afterEach } from 'node:test'
import { ping } from "../solutions/index.js";
import { equal, ifError } from 'node:assert/strict'


describe('1. ping', () => {
    it('1.1. ping manu.dev', (_, done) => {
      ping('manu.dev', (err, info) => {
        ifError(err)
        equal(info.ip, 'manu.dev')
        done()
      })
    })
  })