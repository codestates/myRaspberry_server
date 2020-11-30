import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import {Joined} from './Joined'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('text')
  password: string

  @OneToMany(type => Joined, join => join.user)
  joins: Joined[]
}
