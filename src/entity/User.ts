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
  id!: number

  @Column()
  name!: string

  @Column()
  nickname!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column({nullable: true})
  image!: string

  @Column({default: true})
  isActive!: boolean
}
