import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Score } from './entity/Score';

@Resolver()
export class ScoreResolver {
  @Query(() => [Score])
  scores() {
    return Score.find();
  }

  @Mutation(() => Boolean)
  async saveScore(@Arg('name') name: string, @Arg('score') score: number) {
    try {
      await Score.insert({
        name,
        score,
      });
    } catch (error) {
      console.log('Score insertion error', error);
      return false;
    }

    return true;
  }
}
