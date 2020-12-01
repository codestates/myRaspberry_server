import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable: true})
  name!: string

  @Column()
  nickname!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column({nullable: true})
  image: string

  @Column({default: true})
  isActive: boolean

  static async register(
    email: string,
    password: string,
    nickname: string,
  ): Promise<User | undefined> {
    const {id} = (
      await this.createQueryBuilder()
        .insert()
        .into(User)
        .values([{email, password, nickname}])
        .execute()
    ).identifiers[0] // 리턴값 = [ { id: 6 } ]
    return id
  }
}
