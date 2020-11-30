import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import {TagInfo} from '.'

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
  runtime!: string

  @Column()
  genre!: string

  @Column()
  image!: string

  @OneToMany(type => TagInfo, tag_info => tag_info.movie, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  links!: TagInfo[]
}
