import type { TemplateHelpers } from './template-helpers';
import type { EntityParams } from './types';

interface GenerateEntityParam extends EntityParams {
  templateHelpers: TemplateHelpers;
}
export const generateEntity = ({
  model,
  fields,
  imports,
  apiExtraModels,
  templateHelpers: t,
}: GenerateEntityParam) => `
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { EntityExpose, EntityDate, EntityJson, EntityUUID } from '@bitaccess/nest-core'
import GraphQLJSON from 'graphql-type-json'
${t.importStatements(imports)}

${t.if(apiExtraModels.length, t.apiExtraModels(apiExtraModels))}
@ObjectType('${model.name}')
export class ${t.entityName(model.name)} {
  ${t.fieldsToEntityProps(fields)}
}
`;
