import {Entity, ManyToOne} from 'typeorm'
import {Movie, User} from '.'

@Entity()
export class Joined {
  @ManyToOne(type => User, user => user.joins)
  user: User

  @ManyToOne(type => Movie, movie => movie.joins)
  movie: Movie
}
