const { merge } = require('lodash')

module.exports = merge(require('@innei-util/prettier'), {
  quoteProps: 'consistent',
})
