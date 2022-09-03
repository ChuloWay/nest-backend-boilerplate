import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @ApiProperty({
    description: 'The ID of the User'
})
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    description: 'The Username of the User',
  })
  @Column()
  username: string;

  @ApiProperty({
    description: 'The Email of the User',
  })
  @Column()
  email: string;
  @ApiProperty({
    description: 'The Password of the User',
  })
  @Column()
  password: string;
}
