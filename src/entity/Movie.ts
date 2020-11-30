import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import {Joined} from '.'

@Entity()
export default class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @OneToMany(type => Joined, join => join.movie)
  joins: Joined[]
}
