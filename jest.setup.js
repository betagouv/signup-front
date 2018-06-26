import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {setConfig} from 'next/config'

configure({adapter: new Adapter()})

// Initialize Next.js configuration with empty values.
setConfig({
  publicRuntimeConfig: {
    OAUTH_ME_URI: 'http://localhost:3022/api/v1/me',
    OAUTH_CLIENT_ID: '82546188522214c3577d35c283ce8842786649b35a026a9d44908037a597f29b',
    OAUTH_HOST: 'http://localhost:3022',
    OAUTH_AUTHORIZE_URI: 'http://localhost:3022/oauth/authorize',
    OAUTH_REDIRECT_URI: 'http://localhost:3000/oauth-callback.html',
    BACK_HOST: 'http://localhost:3001',
    FRANCE_CONNECT_AUTHORIZE_URI: 'http://localhost:3001/users/auth/france_connect',
    FRANCE_CONNECT_ME_URI: 'https://partenaires.dev.dev-franceconnect.fr/oauth/v1/userinfo',
    API_ENTREPRISE_HOST: 'https://sandbox.dashboard.entreprise.api.gouv.fr',
    PIWIK_URL: '',
    PIWIK_SITE_ID: ''
  },
  secretRuntimeConfig: {}
})
