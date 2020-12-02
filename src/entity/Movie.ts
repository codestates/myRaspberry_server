import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'

interface SingleMovie {
  title: string
  titleEng: string
  date: string
  director: string
  actor: string
  plotKr: string
  plotEng?: string
  runtime: number
  genre: string
  image: string
  tag: string
}

@Entity()
export default class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  titleEng!: string

  @Column()
  date!: string

  @Column()
  director!: string

  @Column()
  actor!: string

  @Column()
  plotKr!: string

  @Column({nullable: true})
  plotEng!: string

  @Column()
  runtime!: number

  @Column()
  genre!: string

  @Column()
  image!: string

  @Column()
  tag!: string

  static async MovieRegister(movie: SingleMovie): Promise<Movie | undefined> {
    const {id} = (
      await this.createQueryBuilder()
        .insert()
        .into(Movie)
        .values(movie)
        .execute()
    ).identifiers[0]
    return id
  }
}
