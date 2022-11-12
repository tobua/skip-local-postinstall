#!/usr/bin/env node
import { execSync } from 'child_process'
import { skip } from './index.js'

skip()

const command = ['node', ...process.argv.slice(2, process.argv.length)].join(' ')

execSync(command, { stdio: 'inherit' })
