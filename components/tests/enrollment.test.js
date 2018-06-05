import ReactTestRenderer from 'react-test-renderer'
import Enrollment from '../enrollment'

describe('components | Enrollment', () => {
  describe('with enrollment that can send_application at pending state', () => {
    const props = {
      enrollment: {
        demarche: {
          intitule: 'test'
        },
        applicant: {
          email: 'test@test.test'
        },
        messages: [],
        state: 'pending',
        acl: {
          send_application: true // eslint-disable-line camelcase
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
        demarche: {
          intitule: 'test'
        },
        applicant: {
          email: 'test@test.test'
        },
        messages: [],
        state: 'sent',
        acl: {
          validate_application: true, // eslint-disable-line camelcase
          refuse_application: true, // eslint-disable-line camelcase
          review_application: true // eslint-disable-line camelcase
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
        demarche: {
          intitule: 'test'
        },
        messages: [],
        applicant: {
          email: 'test@test.test'
        },
        state: 'sent',
        acl: {
          validate_application: false // eslint-disable-line camelcase
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
        demarche: {
          intitule: 'test'
        },
        applicant: {
          email: 'test@test.test'
        },
        messages: [],
        state: 'validated',
        acl: {
          send_technical_inputs: false // eslint-disable-line camelcase
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
        demarche: {
          intitule: 'test'
        },
        applicant: {
          email: 'test@test.test'
        },
        messages: [],
        state: 'validated',
        acl: {
          send_technical_inputs: true // eslint-disable-line camelcase
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
        demarche: {
          intitule: 'test'
        },
        applicant: {
          email: 'test@test.test'
        },
        messages: [],
        state: 'technical_inputs',
        acl: {
          deploy_application: true // eslint-disable-line camelcase
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
        demarche: {
          intitule: 'test'
        },
        applicant: {
          email: 'test@test.test'
        },
        messages: [],
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
