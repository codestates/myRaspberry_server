import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'
import {UserTag} from '../definitions/index'

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

  @Column({default: true})
  isFirst: boolean

  @Column({type: 'mediumtext'})
  tag: string

  static async register(
    email: string,
    password: string,
    username: string,
  ): Promise<User | undefined> {
    const tag: UserTag = {
      like: {},
      dislike: {},
    }

    const {id} = (
      await this.createQueryBuilder()
        .insert()
        .into(User)
        .values([{email, password, username, tag: JSON.stringify(tag)}])
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
    const tag: UserTag = {
      like: {},
      dislike: {},
    }
    const {id} = (
      await this.createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {provider, socialId, username, profileImg, tag: JSON.stringify(tag)},
        ])
        .execute()
    ).identifiers[0] // 리턴값 = [ { id: 6 } ]

    return this.findOne({id})
  }

  static async changeInfo(id: number, data: object): Promise<User | boolean> {
    const result = await this.createQueryBuilder()
      .update(User)
      .set(data)
      .where('id = :id', {id})
      .execute()

    if (result.raw.affectedRows === 0) {
      return false
    }

    return this.findOne({id})
  }
}
