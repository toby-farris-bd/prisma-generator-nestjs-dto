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
import { ObjectType } from '@nestjs/graphql'
import { EntityExpose, EntityDate, EntityJson, EntityUUID } from '@bitaccess/nest-core'
${t.importStatements(imports)}

${t.if(apiExtraModels.length, t.apiExtraModels(apiExtraModels))}
@ObjectType('${model.name}')
export class ${t.entityName(model.name)} {
  ${t.fieldsToEntityProps(fields)}
}
`;
