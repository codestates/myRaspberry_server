import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({default: 'local'})
  provider!: string

  @Column({default: '0'})
  socialId: string

  @Column()
  username!: string

  @Column({default: 'socialLogin'})
  email!: string

  @Column({default: 'socialPassword'})
  password!: string

  @Column({default: 'noPath'})
  profileImg: string

  @Column({default: true})
  isActive: boolean

  @Column({type: 'mediumtext'})
  like: string
  @Column({type: 'mediumtext'})
  unLike: string
  static async register(
    email: string,
    password: string,
    username: string,
  ): Promise<User | undefined> {
    const {id} = (
      await this.createQueryBuilder()
        .insert()
        .into(User)
        .values([{email, password, username, like: '', unLike: ''}])
        .execute()
    ).identifiers[0] // 리턴값 = [ { id: 6 } ]

    return this.findOne({id})
  }

  static async socialRegister(
    provider: string,
    socialId: string,
    username: string,
    profileImg: string,
  ): Promise<User | undefined> {
    const {id} = (
      await this.createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {provider, socialId, username, profileImg, like: '', unLike: ''},
        ])
        .execute()
    ).identifiers[0] // 리턴값 = [ { id: 6 } ]

    return this.findOne({id})
  }
}
