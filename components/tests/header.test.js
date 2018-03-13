import ReactTestRenderer from 'react-test-renderer'
import {JSDOM} from 'jsdom'
import {mount} from 'enzyme'
import Utils from '../../lib/utils'
import Header from '../header'
import User from '../../lib/user'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('components | Header', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<Header />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
