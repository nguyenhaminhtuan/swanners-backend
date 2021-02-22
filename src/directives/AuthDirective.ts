import {
  AuthenticationError,
  SchemaDirectiveVisitor,
} from 'apollo-server-lambda';
import { defaultFieldResolver, GraphQLField, GraphQLObjectType } from 'graphql';

export class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type: GraphQLObjectType & { _requireAuth: boolean }) {
    type._requireAuth = true;
    this.ensureFieldsWrapped(type);
  }

  visitFieldDefinition(
    field: GraphQLField<any, any, any> & { _requireAuth: boolean },
    details: { objectType: GraphQLObjectType }
  ) {
    field._requireAuth = true;
    this.ensureFieldsWrapped(details.objectType);
  }

  ensureFieldsWrapped(
    objectType: GraphQLObjectType & {
      _authFieldsWrapped?: boolean;
      _requireAuth?: boolean;
    }
  ) {
    if (objectType._authFieldsWrapped) return;

    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();
    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      field.resolve = async function (...args) {
        if ((field as any)._requireAuth || objectType._requireAuth) {
          const ctx = args[2];

          if (ctx.user === null) {
            throw new AuthenticationError('Authentication required');
          }
        }

        return resolve.apply(this, args);
      };
    });
  }
}
