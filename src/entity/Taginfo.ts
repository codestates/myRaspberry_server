import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm'
import {Movie, Tag, User} from '.'

@Entity()
export default class TagInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({type: 'tinyint', default: 1})
  userLike: number

  @ManyToOne(type => User, user => user.links, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User

  @ManyToOne(type => Movie, movie => movie.links, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  movie!: Movie

  @ManyToOne(type => Tag, tag => tag.links, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  tag!: Tag
}
