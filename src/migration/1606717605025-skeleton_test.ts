import {MigrationInterface, QueryRunner} from 'typeorm'

export class skeletonTest1606717605025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. typeorm migration:create -n skeleton_test 로 스켈레톤 생성 후
    // 2. up과 down 내용을 작성
    // 3. typeorm migration:run으로 실행
    // 4. typeorg migration:revert로 취소
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
