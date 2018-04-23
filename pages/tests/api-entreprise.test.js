import ReactTestRenderer from 'react-test-renderer'
import ApiEntreprise from '../../pages/api-entreprise'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('pages | ApiEntreprise', () => {
  describe('render', () => {
    const props = {
      url: {
        query: {
          id: '1'
        }
      }
    }
    const renderer = ReactTestRenderer.create(<ApiEntreprise {...props}/>)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
