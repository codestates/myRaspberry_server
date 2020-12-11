import {authData} from '../../definitions/'
import {User} from '../../entity'

export default async (
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
