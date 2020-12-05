import passport from 'passport'
import * as passportLocal from 'passport-local'
import * as passportGoogle from 'passport-google-oauth20'
import * as passportKakao from 'passport-kakao'
import {compareSync} from 'bcryptjs'
import 'dotenv/config'
import User from '../entity/User'

const LocalStrategy = passportLocal.Strategy
const GoogleStrategy = passportGoogle.Strategy
const KakaoStrategy = passportKakao.Strategy

// passport.serializeUser((user: any, done) => {
//   return done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
//   return User.findOne({where: {id}})
//     .then(user => done(null, user))
//     .catch(err => done(err))
// })

//로그인 전략 변경.

interface authData {
  provider: string
  username: string
  socialId: string
  profileImg: string
}

const socialSign = async (
  data: authData,
  accessToken: string,
  refreshToken: string,
  done: Function,
) => {
  const {provider, socialId, username, profileImg} = data

  const isUser: object = await User.findOne({where: {provider, socialId}})

  if (isUser) {
    return done(null, isUser)
  } else {
    let result = await User.socialRegister(
      provider,
      socialId,
      username,
      profileImg,
    )
    return done(null, result)
  }
}

passport.use(
  new LocalStrategy(
    {usernameField: 'email', passwordField: 'password'},
    async (
      username: string,
      password: string,
      done: Function,
    ): Promise<Function> => {
      let result = await User.findOne({email: username})

      if (result) {
        if (compareSync(password, result.password)) {
          delete result.password
          return done(null, result)
        } else {
          return done(null, false, {message: '비밀번호가 일치하지 않습니다.'})
        }
      } else {
        return done(null, false, {
          message: '일치하는 정보가 존재하지 않습니다.',
        })
      }
    },
  ),
)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken', accessToken)
      console.log('refreshToken', refreshToken)
      const data: authData = {
        provider: profile.provider,
        socialId: profile.id,
        username: profile.displayName,
        profileImg: profile.photos[0].value || 'none',
      }
      return socialSign(data, accessToken, refreshToken, done)
    },
  ),
)

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: '',
      callbackURL: '/auth/kakao/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const data: authData = {
        provider: profile.provider,
        socialId: profile.id,
        username: profile.displayName,
        profileImg: profile._json.properties.thumbnail_image || 'none',
      }
      return socialSign(data, accessToken, refreshToken, done)
    },
  ),
)

export default passport
