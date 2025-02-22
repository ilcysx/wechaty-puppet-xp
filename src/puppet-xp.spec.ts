#!/usr/bin/env node --no-warnings --loader ts-node/esm

import { test } from 'tstest'

import { PuppetXp } from './puppet-xp.js'
import type { WeChatSidecar } from './wechat-sidecar.js'

class PuppetXpTest extends PuppetXp {

  protected override sidecar: WeChatSidecar = {
    // TODO: debug symbols
  } as any

}

test.skip('PuppetXp perfect restart testing', async (t) => {
  const puppet = new PuppetXpTest()
  try {

    for (let i = 0; i < 3; i++) {
      await puppet.start()
      t.true(puppet.state.on(), 'should be turned on after start()')

      await puppet.stop()
      t.true(puppet.state.off(), 'should be turned off after stop()')

      t.pass('start/stop-ed at #' + i)
    }

    t.pass('PuppetXp() perfect restart pass.')
  } catch (e) {
    t.fail(e as any)
  }
})
