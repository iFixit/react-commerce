import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
   collectionName: 'admin_permissions';
   info: {
      name: 'Permission';
      description: '';
      singularName: 'permission';
      pluralName: 'permissions';
      displayName: 'Permission';
   };
   pluginOptions: {
      'content-manager': {
         visible: false;
      };
      'content-type-builder': {
         visible: false;
      };
   };
   attributes: {
      action: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
      subject: Attribute.String &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      properties: Attribute.JSON & Attribute.DefaultTo<{}>;
      conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
      role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'admin::permission',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'admin::permission',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface AdminUser extends Schema.CollectionType {
   collectionName: 'admin_users';
   info: {
      name: 'User';
      description: '';
      singularName: 'user';
      pluralName: 'users';
      displayName: 'User';
   };
   pluginOptions: {
      'content-manager': {
         visible: false;
      };
      'content-type-builder': {
         visible: false;
      };
   };
   attributes: {
      firstname: Attribute.String &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      lastname: Attribute.String &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      username: Attribute.String;
      email: Attribute.Email &
         Attribute.Required &
         Attribute.Private &
         Attribute.Unique &
         Attribute.SetMinMaxLength<{
            minLength: 6;
         }>;
      password: Attribute.Password &
         Attribute.Private &
         Attribute.SetMinMaxLength<{
            minLength: 6;
         }>;
      resetPasswordToken: Attribute.String & Attribute.Private;
      registrationToken: Attribute.String & Attribute.Private;
      isActive: Attribute.Boolean &
         Attribute.Private &
         Attribute.DefaultTo<false>;
      roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
         Attribute.Private;
      blocked: Attribute.Boolean &
         Attribute.Private &
         Attribute.DefaultTo<false>;
      preferedLanguage: Attribute.String;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
         Attribute.Private;
      updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
         Attribute.Private;
   };
}

export interface AdminRole extends Schema.CollectionType {
   collectionName: 'admin_roles';
   info: {
      name: 'Role';
      description: '';
      singularName: 'role';
      pluralName: 'roles';
      displayName: 'Role';
   };
   pluginOptions: {
      'content-manager': {
         visible: false;
      };
      'content-type-builder': {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String &
         Attribute.Required &
         Attribute.Unique &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      code: Attribute.String &
         Attribute.Required &
         Attribute.Unique &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      description: Attribute.String;
      users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
      permissions: Attribute.Relation<
         'admin::role',
         'oneToMany',
         'admin::permission'
      >;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
         Attribute.Private;
      updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
         Attribute.Private;
   };
}

export interface AdminApiToken extends Schema.CollectionType {
   collectionName: 'strapi_api_tokens';
   info: {
      name: 'Api Token';
      singularName: 'api-token';
      pluralName: 'api-tokens';
      displayName: 'Api Token';
      description: '';
   };
   pluginOptions: {
      'content-manager': {
         visible: false;
      };
      'content-type-builder': {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String &
         Attribute.Required &
         Attribute.Unique &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      description: Attribute.String &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }> &
         Attribute.DefaultTo<''>;
      type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
         Attribute.Required &
         Attribute.DefaultTo<'read-only'>;
      accessKey: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      lastUsedAt: Attribute.DateTime;
      permissions: Attribute.Relation<
         'admin::api-token',
         'oneToMany',
         'admin::api-token-permission'
      >;
      expiresAt: Attribute.DateTime;
      lifespan: Attribute.BigInteger;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'admin::api-token',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'admin::api-token',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
   collectionName: 'strapi_api_token_permissions';
   info: {
      name: 'API Token Permission';
      description: '';
      singularName: 'api-token-permission';
      pluralName: 'api-token-permissions';
      displayName: 'API Token Permission';
   };
   pluginOptions: {
      'content-manager': {
         visible: false;
      };
      'content-type-builder': {
         visible: false;
      };
   };
   attributes: {
      action: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      token: Attribute.Relation<
         'admin::api-token-permission',
         'manyToOne',
         'admin::api-token'
      >;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'admin::api-token-permission',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'admin::api-token-permission',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface AdminTransferToken extends Schema.CollectionType {
   collectionName: 'strapi_transfer_tokens';
   info: {
      name: 'Transfer Token';
      singularName: 'transfer-token';
      pluralName: 'transfer-tokens';
      displayName: 'Transfer Token';
      description: '';
   };
   pluginOptions: {
      'content-manager': {
         visible: false;
      };
      'content-type-builder': {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String &
         Attribute.Required &
         Attribute.Unique &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      description: Attribute.String &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }> &
         Attribute.DefaultTo<''>;
      accessKey: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      lastUsedAt: Attribute.DateTime;
      permissions: Attribute.Relation<
         'admin::transfer-token',
         'oneToMany',
         'admin::transfer-token-permission'
      >;
      expiresAt: Attribute.DateTime;
      lifespan: Attribute.BigInteger;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'admin::transfer-token',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'admin::transfer-token',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
   collectionName: 'strapi_transfer_token_permissions';
   info: {
      name: 'Transfer Token Permission';
      description: '';
      singularName: 'transfer-token-permission';
      pluralName: 'transfer-token-permissions';
      displayName: 'Transfer Token Permission';
   };
   pluginOptions: {
      'content-manager': {
         visible: false;
      };
      'content-type-builder': {
         visible: false;
      };
   };
   attributes: {
      action: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 1;
         }>;
      token: Attribute.Relation<
         'admin::transfer-token-permission',
         'manyToOne',
         'admin::transfer-token'
      >;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'admin::transfer-token-permission',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'admin::transfer-token-permission',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface PluginUploadFile extends Schema.CollectionType {
   collectionName: 'files';
   info: {
      singularName: 'file';
      pluralName: 'files';
      displayName: 'File';
      description: '';
   };
   pluginOptions: {
      'content-manager': {
         visible: false;
      };
      'content-type-builder': {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String & Attribute.Required;
      alternativeText: Attribute.String;
      caption: Attribute.String;
      width: Attribute.Integer;
      height: Attribute.Integer;
      formats: Attribute.JSON;
      hash: Attribute.String & Attribute.Required;
      ext: Attribute.String;
      mime: Attribute.String & Attribute.Required;
      size: Attribute.Decimal & Attribute.Required;
      url: Attribute.String & Attribute.Required;
      previewUrl: Attribute.String;
      provider: Attribute.String & Attribute.Required;
      provider_metadata: Attribute.JSON;
      related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
      folder: Attribute.Relation<
         'plugin::upload.file',
         'manyToOne',
         'plugin::upload.folder'
      > &
         Attribute.Private;
      folderPath: Attribute.String &
         Attribute.Required &
         Attribute.Private &
         Attribute.SetMinMax<{
            min: 1;
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'plugin::upload.file',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'plugin::upload.file',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface PluginUploadFolder extends Schema.CollectionType {
   collectionName: 'upload_folders';
   info: {
      singularName: 'folder';
      pluralName: 'folders';
      displayName: 'Folder';
   };
   pluginOptions: {
      'content-manager': {
         visible: false;
      };
      'content-type-builder': {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMax<{
            min: 1;
         }>;
      pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
      parent: Attribute.Relation<
         'plugin::upload.folder',
         'manyToOne',
         'plugin::upload.folder'
      >;
      children: Attribute.Relation<
         'plugin::upload.folder',
         'oneToMany',
         'plugin::upload.folder'
      >;
      files: Attribute.Relation<
         'plugin::upload.folder',
         'oneToMany',
         'plugin::upload.file'
      >;
      path: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMax<{
            min: 1;
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'plugin::upload.folder',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'plugin::upload.folder',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface PluginPublisherAction extends Schema.CollectionType {
   collectionName: 'actions';
   info: {
      singularName: 'action';
      pluralName: 'actions';
      displayName: 'actions';
   };
   options: {
      draftAndPublish: false;
      comment: '';
   };
   pluginOptions: {
      'content-manager': {
         visible: false;
      };
      'content-type-builder': {
         visible: false;
      };
   };
   attributes: {
      executeAt: Attribute.DateTime;
      mode: Attribute.String;
      entityId: Attribute.Integer;
      entitySlug: Attribute.String;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'plugin::publisher.action',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'plugin::publisher.action',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface PluginI18NLocale extends Schema.CollectionType {
   collectionName: 'i18n_locale';
   info: {
      singularName: 'locale';
      pluralName: 'locales';
      collectionName: 'locales';
      displayName: 'Locale';
      description: '';
   };
   options: {
      draftAndPublish: false;
   };
   pluginOptions: {
      'content-manager': {
         visible: false;
      };
      'content-type-builder': {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String &
         Attribute.SetMinMax<{
            min: 1;
            max: 50;
         }>;
      code: Attribute.String & Attribute.Unique;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'plugin::i18n.locale',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'plugin::i18n.locale',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface PluginUsersPermissionsPermission
   extends Schema.CollectionType {
   collectionName: 'up_permissions';
   info: {
      name: 'permission';
      description: '';
      singularName: 'permission';
      pluralName: 'permissions';
      displayName: 'Permission';
   };
   pluginOptions: {
      'content-manager': {
         visible: false;
      };
      'content-type-builder': {
         visible: false;
      };
   };
   attributes: {
      action: Attribute.String & Attribute.Required;
      role: Attribute.Relation<
         'plugin::users-permissions.permission',
         'manyToOne',
         'plugin::users-permissions.role'
      >;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'plugin::users-permissions.permission',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'plugin::users-permissions.permission',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
   collectionName: 'up_roles';
   info: {
      name: 'role';
      description: '';
      singularName: 'role';
      pluralName: 'roles';
      displayName: 'Role';
   };
   pluginOptions: {
      'content-manager': {
         visible: false;
      };
      'content-type-builder': {
         visible: false;
      };
   };
   attributes: {
      name: Attribute.String &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 3;
         }>;
      description: Attribute.String;
      type: Attribute.String & Attribute.Unique;
      permissions: Attribute.Relation<
         'plugin::users-permissions.role',
         'oneToMany',
         'plugin::users-permissions.permission'
      >;
      users: Attribute.Relation<
         'plugin::users-permissions.role',
         'oneToMany',
         'plugin::users-permissions.user'
      >;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'plugin::users-permissions.role',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'plugin::users-permissions.role',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
   collectionName: 'up_users';
   info: {
      name: 'user';
      description: '';
      singularName: 'user';
      pluralName: 'users';
      displayName: 'User';
   };
   options: {
      draftAndPublish: false;
      timestamps: true;
   };
   attributes: {
      username: Attribute.String &
         Attribute.Required &
         Attribute.Unique &
         Attribute.SetMinMaxLength<{
            minLength: 3;
         }>;
      email: Attribute.Email &
         Attribute.Required &
         Attribute.SetMinMaxLength<{
            minLength: 6;
         }>;
      provider: Attribute.String;
      password: Attribute.Password &
         Attribute.Private &
         Attribute.SetMinMaxLength<{
            minLength: 6;
         }>;
      resetPasswordToken: Attribute.String & Attribute.Private;
      confirmationToken: Attribute.String & Attribute.Private;
      confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
      blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
      role: Attribute.Relation<
         'plugin::users-permissions.user',
         'manyToOne',
         'plugin::users-permissions.role'
      >;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'plugin::users-permissions.user',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'plugin::users-permissions.user',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface ApiBannerBanner extends Schema.CollectionType {
   collectionName: 'banners';
   info: {
      singularName: 'banner';
      pluralName: 'banners';
      displayName: 'Banner';
      description: '';
   };
   options: {
      draftAndPublish: true;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      title: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      label: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      description: Attribute.RichText &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      image: Attribute.Media &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      callToAction: Attribute.Component<'page.call-to-action'> &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'api::banner.banner',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'api::banner.banner',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      localizations: Attribute.Relation<
         'api::banner.banner',
         'oneToMany',
         'api::banner.banner'
      >;
      locale: Attribute.String;
   };
}

export interface ApiCompanyCompany extends Schema.CollectionType {
   collectionName: 'companies';
   info: {
      singularName: 'company';
      pluralName: 'companies';
      displayName: 'Company';
   };
   options: {
      draftAndPublish: true;
   };
   attributes: {
      name: Attribute.String & Attribute.Required;
      logo: Attribute.Media;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'api::company.company',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'api::company.company',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface ApiFaqFaq extends Schema.CollectionType {
   collectionName: 'faqs';
   info: {
      singularName: 'faq';
      pluralName: 'faqs';
      displayName: 'FAQ';
      description: '';
   };
   options: {
      draftAndPublish: true;
   };
   attributes: {
      question: Attribute.String & Attribute.Required;
      answer: Attribute.RichText & Attribute.Required;
      category: Attribute.String;
      product_lists: Attribute.Relation<
         'api::faq.faq',
         'manyToMany',
         'api::product-list.product-list'
      >;
      item_type: Attribute.String;
      priority: Attribute.Integer;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
         Attribute.Private;
      updatedBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
         Attribute.Private;
   };
}

export interface ApiGlobalGlobal extends Schema.SingleType {
   collectionName: 'globals';
   info: {
      singularName: 'global';
      pluralName: 'globals';
      displayName: 'Global';
   };
   options: {
      draftAndPublish: true;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      newsletterForm: Attribute.Component<'global.newsletter-form'> &
         Attribute.Required &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'api::global.global',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'api::global.global',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      localizations: Attribute.Relation<
         'api::global.global',
         'oneToMany',
         'api::global.global'
      >;
      locale: Attribute.String;
   };
}

export interface ApiItemTypeItemType extends Schema.CollectionType {
   collectionName: 'item_types';
   info: {
      singularName: 'item-type';
      pluralName: 'item-types';
      displayName: 'Item Type';
   };
   options: {
      draftAndPublish: true;
   };
   attributes: {
      akeneo_code: Attribute.String & Attribute.Required & Attribute.Unique;
      fallback_image: Attribute.Media & Attribute.Required;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'api::item-type.item-type',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'api::item-type.item-type',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface ApiMenuMenu extends Schema.CollectionType {
   collectionName: 'menus';
   info: {
      singularName: 'menu';
      pluralName: 'menus';
      displayName: 'Menu';
      description: '';
   };
   options: {
      draftAndPublish: true;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      title: Attribute.String &
         Attribute.Required &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      items: Attribute.DynamicZone<
         [
            'menu.link-with-image',
            'menu.link',
            'menu.product-list-link',
            'menu.submenu'
         ]
      > &
         Attribute.Required &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'api::menu.menu',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'api::menu.menu',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      localizations: Attribute.Relation<
         'api::menu.menu',
         'oneToMany',
         'api::menu.menu'
      >;
      locale: Attribute.String;
   };
}

export interface ApiPagePage extends Schema.CollectionType {
   collectionName: 'pages';
   info: {
      singularName: 'page';
      pluralName: 'pages';
      displayName: 'Page';
      description: '';
   };
   options: {
      draftAndPublish: true;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      path: Attribute.String &
         Attribute.Required &
         Attribute.Unique &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      title: Attribute.String &
         Attribute.Required &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      metaTitle: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      metaDescription: Attribute.Text &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      sections: Attribute.DynamicZone<
         [
            'page.hero',
            'page.browse',
            'page.stats',
            'page.split-with-image',
            'page.press',
            'section.featured-products',
            'section.social-gallery',
            'section.lifetime-warranty',
            'section.banner',
            'section.quote-gallery'
         ]
      > &
         Attribute.Required &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'api::page.page',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'api::page.page',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      localizations: Attribute.Relation<
         'api::page.page',
         'oneToMany',
         'api::page.page'
      >;
      locale: Attribute.String;
   };
}

export interface ApiProductProduct extends Schema.CollectionType {
   collectionName: 'products';
   info: {
      singularName: 'product';
      pluralName: 'products';
      displayName: 'Product';
      description: '';
   };
   options: {
      draftAndPublish: true;
   };
   attributes: {
      handle: Attribute.String & Attribute.Required & Attribute.Unique;
      sections: Attribute.DynamicZone<
         [
            'product.product',
            'page.split-with-image',
            'product.replacement-guides',
            'section.stories',
            'section.service-value-propositions',
            'product.cross-sell',
            'product.product-customer-reviews',
            'section.featured-products',
            'product.device-compatibility',
            'section.lifetime-warranty',
            'section.banner',
            'section.quote',
            'section.faqs',
            'product.bit-table',
            'section.tools'
         ]
      > &
         Attribute.Required;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'api::product.product',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'api::product.product',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface ApiProductListProductList extends Schema.CollectionType {
   collectionName: 'product_lists';
   info: {
      singularName: 'product-list';
      pluralName: 'product-lists';
      displayName: 'ProductList';
      description: '';
   };
   options: {
      draftAndPublish: true;
   };
   pluginOptions: {
      i18n: {
         localized: true;
      };
   };
   attributes: {
      type: Attribute.Enumeration<
         ['all-parts', 'parts', 'all-tools', 'tools', 'marketing']
      > &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }> &
         Attribute.DefaultTo<'parts'>;
      handle: Attribute.UID &
         Attribute.Required &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      title: Attribute.String &
         Attribute.Required &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      h1: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      description: Attribute.RichText &
         Attribute.Required &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      heroImage: Attribute.Media &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      image: Attribute.Media &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      brandLogo: Attribute.Media &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      brandLogoWidth: Attribute.Integer &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      filters: Attribute.Text &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      tagline: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      metaDescription: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }> &
         Attribute.SetMinMaxLength<{
            maxLength: 320;
         }>;
      metaTitle: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }> &
         Attribute.SetMinMaxLength<{
            maxLength: 130;
         }>;
      deviceTitle: Attribute.String &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      forceNoindex: Attribute.Boolean &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }> &
         Attribute.DefaultTo<false>;
      hideFromParent: Attribute.Boolean &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }> &
         Attribute.DefaultTo<false>;
      parent: Attribute.Relation<
         'api::product-list.product-list',
         'manyToOne',
         'api::product-list.product-list'
      >;
      children: Attribute.Relation<
         'api::product-list.product-list',
         'oneToMany',
         'api::product-list.product-list'
      >;
      legacyPageId: Attribute.Integer &
         Attribute.Unique &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      sections: Attribute.DynamicZone<
         [
            'product-list.banner',
            'product-list.linked-product-list-set',
            'product-list.related-posts'
         ]
      > &
         Attribute.Required &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      sortPriority: Attribute.Integer &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }> &
         Attribute.DefaultTo<0>;
      legacyDescription: Attribute.RichText &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      defaultShowAllChildrenOnLgSizes: Attribute.Boolean &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }> &
         Attribute.DefaultTo<false>;
      itemOverrides: Attribute.DynamicZone<
         ['product-list.item-type-override']
      > &
         Attribute.Required &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      faqs: Attribute.Relation<
         'api::product-list.product-list',
         'manyToMany',
         'api::faq.faq'
      >;
      optionalFilters: Attribute.Text &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }>;
      indexVariantsInsteadOfDevice: Attribute.Boolean &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: true;
            };
         }> &
         Attribute.DefaultTo<false>;
      redirectTo: Attribute.Relation<
         'api::product-list.product-list',
         'manyToOne',
         'api::product-list.product-list'
      > &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      redirectToType: Attribute.Enumeration<['permanent', 'temporary']> &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }> &
         Attribute.DefaultTo<'permanent'>;
      redirectFrom: Attribute.Relation<
         'api::product-list.product-list',
         'oneToMany',
         'api::product-list.product-list'
      > &
         Attribute.SetPluginOptions<{
            i18n: {
               localized: false;
            };
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'api::product-list.product-list',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'api::product-list.product-list',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      localizations: Attribute.Relation<
         'api::product-list.product-list',
         'oneToMany',
         'api::product-list.product-list'
      >;
      locale: Attribute.String;
   };
}

export interface ApiReusableSectionReusableSection
   extends Schema.CollectionType {
   collectionName: 'reusable_sections';
   info: {
      singularName: 'reusable-section';
      pluralName: 'reusable-sections';
      displayName: 'Reusable Section';
      description: '';
   };
   options: {
      draftAndPublish: true;
   };
   attributes: {
      title: Attribute.String & Attribute.Required & Attribute.Private;
      placement: Attribute.Component<'misc.placement', true> &
         Attribute.Required;
      priority: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
      positionInProductList: Attribute.Enumeration<
         ['top', 'after products', 'bottom']
      > &
         Attribute.Required &
         Attribute.DefaultTo<'after products'>;
      section: Attribute.DynamicZone<
         [
            'section.banner',
            'page.split-with-image',
            'page.press',
            'section.quote-gallery',
            'section.faqs'
         ]
      > &
         Attribute.Required &
         Attribute.SetMinMax<{
            min: 1;
            max: 1;
         }>;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'api::reusable-section.reusable-section',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'api::reusable-section.reusable-section',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface ApiScrewdriverBitScrewdriverBit extends Schema.CollectionType {
   collectionName: 'screwdriver_bits';
   info: {
      singularName: 'screwdriver-bit';
      pluralName: 'screwdriver-bits';
      displayName: 'ScrewdriverBit';
      description: '';
   };
   options: {
      draftAndPublish: false;
   };
   attributes: {
      type: Attribute.Relation<
         'api::screwdriver-bit.screwdriver-bit',
         'oneToOne',
         'api::screwdriver-bit-type.screwdriver-bit-type'
      >;
      size: Attribute.String;
      slug: Attribute.UID;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'api::screwdriver-bit.screwdriver-bit',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'api::screwdriver-bit.screwdriver-bit',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface ApiScrewdriverBitTypeScrewdriverBitType
   extends Schema.CollectionType {
   collectionName: 'screwdriver_bit_types';
   info: {
      singularName: 'screwdriver-bit-type';
      pluralName: 'screwdriver-bit-types';
      displayName: 'ScrewdriverBitType';
      description: '';
   };
   options: {
      draftAndPublish: false;
   };
   attributes: {
      name: Attribute.String & Attribute.Required;
      driverSize: Attribute.String & Attribute.Required;
      icon: Attribute.Media & Attribute.Required;
      slug: Attribute.UID;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'api::screwdriver-bit-type.screwdriver-bit-type',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'api::screwdriver-bit-type.screwdriver-bit-type',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface ApiSocialPostSocialPost extends Schema.CollectionType {
   collectionName: 'social_posts';
   info: {
      singularName: 'social-post';
      pluralName: 'social-posts';
      displayName: 'SocialPost';
      description: '';
   };
   options: {
      draftAndPublish: true;
   };
   attributes: {
      title: Attribute.String & Attribute.Private & Attribute.Unique;
      image: Attribute.Media & Attribute.Required;
      author: Attribute.String & Attribute.Required;
      url: Attribute.String;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'api::social-post.social-post',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'api::social-post.social-post',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

export interface ApiStoreStore extends Schema.CollectionType {
   collectionName: 'stores';
   info: {
      singularName: 'store';
      pluralName: 'stores';
      displayName: 'Store';
      description: '';
   };
   options: {
      draftAndPublish: true;
   };
   attributes: {
      code: Attribute.UID & Attribute.Required;
      name: Attribute.String & Attribute.Required;
      url: Attribute.String & Attribute.Required;
      currency: Attribute.Enumeration<['AUD', 'CAD', 'EUR', 'GBP', 'USD']> &
         Attribute.Required;
      shopifySettings: Attribute.Component<'store.shopify-settings'>;
      header: Attribute.Component<'store.header'> & Attribute.Required;
      footer: Attribute.Component<'store.footer'> & Attribute.Required;
      socialMediaAccounts: Attribute.Component<'store.social-media-accounts'> &
         Attribute.Required;
      createdAt: Attribute.DateTime;
      updatedAt: Attribute.DateTime;
      publishedAt: Attribute.DateTime;
      createdBy: Attribute.Relation<
         'api::store.store',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
      updatedBy: Attribute.Relation<
         'api::store.store',
         'oneToOne',
         'admin::user'
      > &
         Attribute.Private;
   };
}

declare module '@strapi/types' {
   export module Shared {
      export interface ContentTypes {
         'admin::permission': AdminPermission;
         'admin::user': AdminUser;
         'admin::role': AdminRole;
         'admin::api-token': AdminApiToken;
         'admin::api-token-permission': AdminApiTokenPermission;
         'admin::transfer-token': AdminTransferToken;
         'admin::transfer-token-permission': AdminTransferTokenPermission;
         'plugin::upload.file': PluginUploadFile;
         'plugin::upload.folder': PluginUploadFolder;
         'plugin::publisher.action': PluginPublisherAction;
         'plugin::i18n.locale': PluginI18NLocale;
         'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
         'plugin::users-permissions.role': PluginUsersPermissionsRole;
         'plugin::users-permissions.user': PluginUsersPermissionsUser;
         'api::banner.banner': ApiBannerBanner;
         'api::company.company': ApiCompanyCompany;
         'api::faq.faq': ApiFaqFaq;
         'api::global.global': ApiGlobalGlobal;
         'api::item-type.item-type': ApiItemTypeItemType;
         'api::menu.menu': ApiMenuMenu;
         'api::page.page': ApiPagePage;
         'api::product.product': ApiProductProduct;
         'api::product-list.product-list': ApiProductListProductList;
         'api::reusable-section.reusable-section': ApiReusableSectionReusableSection;
         'api::screwdriver-bit.screwdriver-bit': ApiScrewdriverBitScrewdriverBit;
         'api::screwdriver-bit-type.screwdriver-bit-type': ApiScrewdriverBitTypeScrewdriverBitType;
         'api::social-post.social-post': ApiSocialPostSocialPost;
         'api::store.store': ApiStoreStore;
      }
   }
}
