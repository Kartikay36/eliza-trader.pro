import bcryptjs from 'bcryptjs';

const password = '$uper#admin@Elizabeth2025!$';

bcryptjs.hash(password, 10)
  .then((hash) => {
    console.log('Generated Hash:', hash);
    console.log('Add this to your .env file as ADMIN_PASSWORD_HASH=', hash);
  })
  .catch((err) => console.error('Error generating hash:', err));
