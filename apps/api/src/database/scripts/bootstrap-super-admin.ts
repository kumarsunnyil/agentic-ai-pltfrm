import 'reflect-metadata';
import 'dotenv/config';

import { DataSource } from 'typeorm';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { UserEntity } from '../../modules/auth/entities/user.entity';
import { UserRole } from '../../modules/auth/types/auth.types';

async function bootstrapSuperAdmin(): Promise<void> {
  const emailArgument = process.argv[2];

  if (!emailArgument) {
    throw new Error('Usage: pnpm bootstrap:super-admin <email>');
  }

  const email = emailArgument.trim().toLowerCase();

  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [UserEntity],
    synchronize: false,
  });

  await dataSource.initialize();

  try {
    const userRepository = dataSource.getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error(`No user found with email: ${email}`);
    }

    if (!user.isActive) {
      throw new Error('Cannot promote an inactive user.');
    }

    if (user.roles.includes(UserRole.SuperAdmin)) {
      console.log(`${email} is already a SUPER_ADMIN.`);
      return;
    }

    const rl = readline.createInterface({ input, output });

    try {
      const confirmation = await rl.question(
        `Promote ${email} to SUPER_ADMIN? Type YES to confirm: `,
      );

      if (confirmation !== 'YES') {
        console.log('Promotion cancelled.');
        return;
      }
    } finally {
      rl.close();
    }

    user.roles = [...new Set([...user.roles, UserRole.SuperAdmin])];

    await userRepository.save(user);

    console.log(`Successfully promoted ${email} to SUPER_ADMIN.`);
  } finally {
    await dataSource.destroy();
  }
}

bootstrapSuperAdmin().catch((error: unknown) => {
  console.error('Super Admin bootstrap failed:', error);
  process.exitCode = 1;
});
