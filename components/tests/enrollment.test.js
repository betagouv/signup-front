import ReactTestRenderer from 'react-test-renderer'
import Enrollment from '../enrollment'
import RESOURCE_PROVIDERS from '../../mock/data/resource-providers'

describe('components | Enrollment', () => {
  describe('with enrollment that can send_application at pending state', () => {
    const props = {
      enrollment: {
        applicant: {
          email: 'test@test.test'
        },
        state: 'pending',
        acl: {
          send_application: true
        }
      }
    }
    const renderer = ReactTestRenderer.create(<Enrollment {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })

  describe('with enrollment that can validate_application, refuse_application and review_application at sent state', () => {
    const props = {
      enrollment: {
        applicant: {
          email: 'test@test.test'
        },
        state: 'sent',
        acl: {
          validate_application: true,
          refuse_application: true,
          review_application: true
        }
      }
    }
    const renderer = ReactTestRenderer.create(<Enrollment {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })

  describe('with enrollment that cannot validate_application at sent state', () => {
    const props = {
      enrollment: {
        applicant: {
          email: 'test@test.test'
        },
        state: 'sent',
        acl: {
          validate_application: false
        }
      }
    }
    const renderer = ReactTestRenderer.create(<Enrollment {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })

  describe('with enrollment that cannot send_technical_inputs at validated state', () => {
    const props = {
      enrollment: {
        applicant: {
          email: 'test@test.test'
        },
        state: 'validated',
        acl: {
          send_technical_inputs: false
        }
      }
    }
    const renderer = ReactTestRenderer.create(<Enrollment {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })

  describe('with enrollment that can send_technical_inputs at validated state', () => {
    const props = {
      enrollment: {
        applicant: {
          email: 'test@test.test'
        },
        state: 'validated',
        acl: {
          send_technical_inputs: true
        }
      }
    }
    const renderer = ReactTestRenderer.create(<Enrollment {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })

  describe('with enrollment that can deploy_application at technical_inputs state', () => {
    const props = {
      enrollment: {
        applicant: {
          email: 'test@test.test'
        },
        state: 'technical_inputs',
        acl: {
          deploy_application: true
        }
      }
    }
    const renderer = ReactTestRenderer.create(<Enrollment {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })

  describe('with enrollment at deployed state', () => {
    const props = {
      enrollment: {
        applicant: {
          email: 'test@test.test'
        },
        state: 'deployed',
        acl: {}
      }
    }
    const renderer = ReactTestRenderer.create(<Enrollment {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
