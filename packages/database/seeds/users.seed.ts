import { hash } from 'bcrypt';
import { users } from '../schema';
import type { DbTransaction } from '../db';

export async function seedSuperAdmin(tx: DbTransaction) {
  const email = process.env.SA_EMAIL!;
  const password = await hash(process.env.SA_PASSWORD!, 10);

  await tx
    .insert(users)
    .values({
      email,
      password,
      name: 'Super Admin',
      isSuperAdmin: true,
    })
    .onConflictDoNothing({
      target: [users.email],
    });
}
