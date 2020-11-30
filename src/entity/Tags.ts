import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm'
import {TagInfo} from '.'

@Entity()
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  category!: string

  @Column()
  name!: string

  @OneToMany(type => TagInfo, tag_info => tag_info.tag, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  links!: TagInfo[]
}
