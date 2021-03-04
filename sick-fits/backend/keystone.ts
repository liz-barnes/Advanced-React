import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { ProductImage } from './schemas/ProductImage';
import { Product } from './schemas/Products';
import { User } from './schemas/User';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  // How long does user stay signed in?
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

// export default withAuth(
//   config({
//     server: {
//       cors: {
//         origin: [process.env.FRONTEND_URL],
//         credentials: true,
//       },
//     },
//     db: {
//       adapter: 'mongoose',
//       url: databaseURL,
//     },
//     lists: createSchema({
//       // Schema items go in here
//       User,
//     }),
//     ui: {
//       isAccessAllowed: ({ session }) => {
//         console.log(session);
//         return !!session?.data;
//       },
//     },
//     session: withItemData(statelessSessions(sessionConfig), {
//       User: 'id',
//     }),
//   })
// );

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // isAccessAllowed: () => true,
      isAccessAllowed: ({ session }) => {
        console.log(session);
        return !!session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  })
);
