import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm'

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'mod',
  USER = 'user',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non_binary',
  OTHER = 'other',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  firstName!: string
  @Column()
  lastName!: string
  @Column({ unique: true })
  userName!: string
  @Column({ unique: true })
  email!: string
  @Column()
  password!: string

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender!: Gender

  @Column({ type: 'date' })
  birthday!: Date

  // Nullable columns
  @Column({ nullable: true })
  nickName?: string
  @Column('text', { nullable: true })
  bio?: string
  @Column({ nullable: true })
  profilePhotoUrl?: string
  @Column({ nullable: true })
  profileCoverUrl?: string

  // Friendship
  @ManyToMany((type) => User, (user) => user.following)
  @JoinTable()
  followers?: User[]

  @ManyToMany((type) => User, (user) => user.followers)
  following?: User[]

  @ManyToMany((type) => User, (user) => user.blockedUsers)
  @JoinTable()
  blockedBy?: User[]

  @ManyToMany((type) => User, (user) => user.blockedUsers)
  blockedUsers?: User[]

  // Metadata
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    update: false,
  })
  createdAt?: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt?: Date

  @Column({ default: false })
  verified?: boolean
  @Column({ default: false })
  tempBanned?: boolean
  @Column({ default: false })
  permanentBanned?: boolean
  @Column({ default: false })
  premium?: boolean
  @Column({ default: false })
  verified_email?: boolean

  @Column({ type: 'timestamp', nullable: true })
  tempBanEnd?: Date

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role?: UserRole
}
