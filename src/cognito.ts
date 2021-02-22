import {
  PreSignUpTriggerHandler,
  PostConfirmationTriggerHandler,
  PostAuthenticationTriggerHandler,
  PreTokenGenerationTriggerHandler,
} from 'aws-lambda';
import db from './db';

export const preSignUp: PreSignUpTriggerHandler = async (
  event,
  context,
  callback
) => {
  const id = event.userName;
  const { email } = event.request.userAttributes;
  const fullName = id.split('-')[0];

  await db.user.create({
    data: { id, email, fullName },
  });
  return callback(null, event);
};

export const postComfirmation: PostConfirmationTriggerHandler = async (
  event,
  context,
  callback
) => {
  await db.user.update({
    where: { id: event.userName },
    data: { status: 'ENABLED' },
  });
  return callback(null, event);
};

export const postAuthentication: PostAuthenticationTriggerHandler = async (
  event,
  context,
  callback
) => {
  await db.user.update({
    where: { id: event.userName },
    data: { lastLoginAt: new Date() },
  });
  return callback(null, event);
};

export const preTokenGeneration: PreTokenGenerationTriggerHandler = async (
  event,
  context,
  callback
) => {
  return callback(null, event);
};
