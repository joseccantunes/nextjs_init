import { relations, sql } from "drizzle-orm";
import {
    bigint,
    index,
    int,
    mysqlTableCreator,
    primaryKey,
    text,
    timestamp,
    uniqueIndex,
    varchar,
} from "drizzle-orm/mysql-core";

import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `boxmenu_${name}`);


export const users = mysqlTable("user", {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified", {
        mode: "date",
        fsp: 3,
    }).default(sql`CURRENT_TIMESTAMP(3)`),
    image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
}));

export const accounts = mysqlTable(
    "account",
    {
        userId: varchar("userId", { length: 255 }).notNull(),
        type: varchar("type", { length: 255 })
            .$type<AdapterAccount["type"]>()
            .notNull(),
        provider: varchar("provider", { length: 255 }).notNull(),
        providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: int("expires_at"),
        token_type: varchar("token_type", { length: 255 }),
        scope: varchar("scope", { length: 255 }),
        id_token: text("id_token"),
        session_state: varchar("session_state", { length: 255 }),
    },
    (account) => ({
        compoundKey: primaryKey(account.provider, account.providerAccountId),
        userIdIdx: index("userId_idx").on(account.userId),
    })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
    "session",
    {
        sessionToken: varchar("sessionToken", { length: 255 })
            .notNull()
            .primaryKey(),
        userId: varchar("userId", { length: 255 }).notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (session) => ({
        userIdIdx: index("userId_idx").on(session.userId),
    })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
    "verificationToken",
    {
        identifier: varchar("identifier", { length: 255 }).notNull(),
        token: varchar("token", { length: 255 }).notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey(vt.identifier, vt.token),
    })
);

/*
export const extraItem = mysqlTable(
  "ExtraItem",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: varchar("description", { length: 191 }).notNull(),
    price: decimal("price", { precision: 65, scale: 30 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      extraItemId: primaryKey(table.id),
    };
  },
);

export const itemCategory = mysqlTable(
  "ItemCategory",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    icon: varchar("icon", { length: 191 }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      itemCategoryId: primaryKey(table.id),
    };
  },
);

export const menu = mysqlTable(
  "Menu",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: varchar("description", { length: 191 }).notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      userIdIdx: index("Menu_userId_idx").on(table.userId),
      updatedAtIdx: index("Menu_updatedAt_idx").on(table.updatedAt),
      menuId: primaryKey(table.id),
    };
  },
);

export const menuItem = mysqlTable(
  "MenuItem",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: varchar("description", { length: 191 }).notNull(),
    price: decimal("price", { precision: 65, scale: 30 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      menuItemId: primaryKey(table.id),
    };
  },
);

export const menuItemExtraItem = mysqlTable(
  "MenuItemExtraItem",
  {
    id: int("id").autoincrement().notNull(),
    menuItemId: int("menuItemId").notNull(),
    extraItemId: int("extraItemId").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      menuItemIdIdx: index("MenuItemExtraItem_menuItemId_idx").on(table.menuItemId),
      extraItemIdIdx: index("MenuItemExtraItem_extraItemId_idx").on(table.extraItemId),
      menuItemExtraItemId: primaryKey(table.id),
      menuItemExtraItemMenuItemIdExtraItemIdKey: unique("MenuItemExtraItem_menuItemId_extraItemId_key").on(table.menuItemId, table.extraItemId),
    };
  },
);

export const menuItemItemCategory = mysqlTable(
  "MenuItemItemCategory",
  {
    id: int("id").autoincrement().notNull(),
    menuItemId: int("menuItemId").notNull(),
    itemCategoryId: int("itemCategoryId").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      menuItemIdIdx: index("MenuItemItemCategory_menuItemId_idx").on(table.menuItemId),
      itemCategoryIdIdx: index("MenuItemItemCategory_itemCategoryId_idx").on(table.itemCategoryId),
      menuItemItemCategoryId: primaryKey(table.id),
      menuItemItemCategoryMenuItemIdItemCategoryIdKey: unique("MenuItemItemCategory_menuItemId_itemCategoryId_key").on(
        table.menuItemId,
        table.itemCategoryId,
      ),
    };
  },
);

export const menuItemMenu = mysqlTable(
  "MenuItemMenu",
  {
    id: int("id").autoincrement().notNull(),
    menuItemId: int("menuItemId").notNull(),
    menuId: int("menuId").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      menuIdIdx: index("MenuItemMenu_menuId_idx").on(table.menuId),
      menuItemIdIdx: index("MenuItemMenu_menuItemId_idx").on(table.menuItemId),
      menuItemMenuId: primaryKey(table.id),
      menuItemMenuMenuItemIdMenuIdKey: unique("MenuItemMenu_menuItemId_menuId_key").on(table.menuItemId, table.menuId),
    };
  },
);

export const menuRestaurant = mysqlTable(
  "MenuRestaurant",
  {
    id: int("id").autoincrement().notNull(),
    menuId: int("menuId").notNull(),
    restaurantId: int("restaurantId").notNull(),
    weekDays: varchar("weekDays", { length: 191 }).notNull(),
    startTime: time("startTime", { fsp: 3 }).notNull(),
    endTime: time("endTime", { fsp: 3 }).notNull(),
    active: tinyint("active").default(0).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      menuIdIdx: index("MenuRestaurant_menuId_idx").on(table.menuId),
      restaurantIdIdx: index("MenuRestaurant_restaurantId_idx").on(table.restaurantId),
      menuRestaurantId: primaryKey(table.id),
      menuRestaurantMenuIdRestaurantIdKey: unique("MenuRestaurant_menuId_restaurantId_key").on(table.menuId, table.restaurantId),
    };
  },
);

export const order = mysqlTable(
  "Order",
  {
    id: int("id").autoincrement().notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    restaurantId: int("restaurantId").notNull(),
    orderStatusId: int("orderStatusId").notNull(),
    restaurantTableId: int("restaurantTableId").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      userIdIdx: index("Order_userId_idx").on(table.userId),
      restaurantIdIdx: index("Order_restaurantId_idx").on(table.restaurantId),
      orderStatusIdIdx: index("Order_orderStatusId_idx").on(table.orderStatusId),
      restaurantTableIdIdx: index("Order_restaurantTableId_idx").on(table.restaurantTableId),
      orderId: primaryKey(table.id),
    };
  },
);

export const orderMenuItem = mysqlTable(
  "OrderMenuItem",
  {
    id: int("id").autoincrement().notNull(),
    orderId: int("orderId").notNull(),
    menuItemId: int("menuItemId").notNull(),
    quantity: int("quantity").default(1).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      orderIdIdx: index("OrderMenuItem_orderId_idx").on(table.orderId),
      menuItemIdIdx: index("OrderMenuItem_menuItemId_idx").on(table.menuItemId),
      orderMenuItemId: primaryKey(table.id),
    };
  },
);

export const orderMenuItemExtraItem = mysqlTable(
  "OrderMenuItemExtraItem",
  {
    id: int("id").autoincrement().notNull(),
    orderMenuItemId: int("orderMenuItemId").notNull(),
    extraItemId: int("extraItemId").notNull(),
    quantity: int("quantity").default(1).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      orderMenuItemIdIdx: index("OrderMenuItemExtraItem_orderMenuItemId_idx").on(table.orderMenuItemId),
      extraItemIdIdx: index("OrderMenuItemExtraItem_extraItemId_idx").on(table.extraItemId),
      orderMenuItemExtraItemId: primaryKey(table.id),
      orderMenuItemExtraItemOrderMenuItemIdExtraItemIdKey: unique("OrderMenuItemExtraItem_orderMenuItemId_extraItemId_key").on(
        table.orderMenuItemId,
        table.extraItemId,
      ),
    };
  },
);

export const orderStatus = mysqlTable(
  "OrderStatus",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      orderStatusId: primaryKey(table.id),
    };
  },
);

export const plan = mysqlTable(
  "Plan",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: varchar("description", { length: 191 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).default("0.00").notNull(),
    maxMenus: int("maxMenus").notNull(),
    maxRestaurants: int("maxRestaurants").notNull(),
    maxProducts: int("maxProducts").notNull(),
  },
  (table) => {
    return {
      planId: primaryKey(table.id),
    };
  },
);

export const restaurant = mysqlTable(
  "Restaurant",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    address: varchar("address", { length: 191 }),
    phone: varchar("phone", { length: 191 }),
    publicId: varchar("publicId", { length: 191 }).notNull(),
    menusSchema: text("menusSchema"), //stores the menus schema in json format
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
    tables: int("tables").default(10).notNull(),
    logoUrl: varchar("logoUrl", { length: 191 }).default("").notNull(),
  },
  (table) => {
    return {
      restaurantId: primaryKey(table.id),
    };
  },
);

export const restaurantTable = mysqlTable(
  "RestaurantTable",
  {
    id: int("id").autoincrement().notNull(),
    restaurantId: int("restaurantId").notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      restaurantIdIdx: index("RestaurantTable_restaurantId_idx").on(table.restaurantId),
      restaurantTableId: primaryKey(table.id),
    };
  },
);

export const session = mysqlTable(
  "Session",
  {
    id: varchar("id", { length: 191 }).notNull(),
    sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    expires: datetime("expires", { mode: "string", fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("Session_userId_idx").on(table.userId),
      sessionId: primaryKey(table.id),
      sessionSessionTokenKey: unique("Session_sessionToken_key").on(table.sessionToken),
    };
  },
);

export const user = mysqlTable(
  "User",
  {
    id: varchar("id", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }),
    email: varchar("email", { length: 191 }),
    emailVerified: datetime("emailVerified", { mode: "string", fsp: 3 }),
    image: varchar("image", { length: 191 }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      userId: primaryKey(table.id),
      userEmailKey: unique("User_email_key").on(table.email),
    };
  },
);

export const userRestaurant = mysqlTable(
  "UserRestaurant",
  {
    id: int("id").autoincrement().notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    restaurantId: int("restaurantId").notNull(),
    permissions: varchar("permissions", { length: 191 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      userIdIdx: index("UserRestaurant_userId_idx").on(table.userId),
      restaurantIdIdx: index("UserRestaurant_restaurantId_idx").on(table.restaurantId),
      userRestaurantId: primaryKey(table.id),
    };
  },
);

export const userSettings = mysqlTable(
  "UserSettings",
  {
    userId: varchar("userId", { length: 191 }).notNull(),
    themeMode: varchar("themeMode", { length: 191 }).default("light").notNull(),
    planId: int("planId").default(1).notNull(),
    language: varchar("language", { length: 191 }).default("pt-PT").notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("UserSettings_userId_idx").on(table.userId),
      planIdIdx: index("UserSettings_planId_idx").on(table.planId),
      userSettingsUserIdKey: unique("UserSettings_userId_key").on(table.userId),
    };
  },
);

export const verificationToken = mysqlTable(
  "VerificationToken",
  {
    identifier: varchar("identifier", { length: 191 }).notNull(),
    token: varchar("token", { length: 191 }).notNull(),
    expires: datetime("expires", { mode: "string", fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      verificationTokenTokenKey: unique("VerificationToken_token_key").on(table.token),
      verificationTokenIdentifierTokenKey: unique("VerificationToken_identifier_token_key").on(table.identifier, table.token),
    };
  },
);

*/