import bcrypt from 'bcrypt';
import { User, Category } from '../models/index.js';

export async function createDefault() {
  try {
    const existingUser = await User.findOne({ where: { username: 'admin' } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        email: `admin${Date.now()}@example.com`, // Email acak
        password: hashedPassword,
        role: 'admin',
        status: 'active'
      });
      console.log('✅ Admin user berhasil dibuat!');
    } else {
      console.log('ℹ️ Admin user sudah ada.');
    }

    const existingCategory = await Category.findOne({ where: { slug: 'uncategorized' } });
    if (!existingCategory) {
      await Category.create({
        name: 'Uncategorized',
        slug: 'uncategorized',
        description: 'Default category untuk post yang belum memiliki kategori',
        status: 'active'
      });
      console.log('✅ Kategori default berhasil dibuat!');
    } else {
      console.log('ℹ️ Kategori default sudah ada.');
    }

  } catch (err) {
    console.error('❌ Gagal membuat data default:', err.message);
  }
}
