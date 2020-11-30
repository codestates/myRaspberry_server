import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm'

@Entity()
export default class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  titleEng!: string

  @Column()
  year!: string

  @Column()
  director!: string

  @Column()
  actor!: string

  @Column()
  plotKr!: string

  @Column()
  plotEng!: string

  @Column()
  runtime!: number

  @Column()
  genre!: string

  @Column()
  image!: string

  @Column()
  tag!: string
}
