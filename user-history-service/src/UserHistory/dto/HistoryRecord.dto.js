import Joi from "joi";

export const HistoryRecordCreateDtoSchema = Joi.object({
  tableName: Joi.string().required(),
  columnName: Joi.string().required(),
  oldValue: Joi.any(),
  newValue: Joi.any().required(),
  entityId: Joi.number().required(),
});

export const HistoryRecordArrayCreateDtoSchema = Joi.array().items(
  HistoryRecordCreateDtoSchema
);

export const HistoryRecordGetAllDtoSchema = Joi.object({
  tableName: Joi.string().required(),
  columnName: Joi.string().required(),
  entityId: Joi.number().required(),
  page: Joi.number().min(1),
  limit: Joi.number().min(10),
});
